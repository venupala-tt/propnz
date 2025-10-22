import { NextResponse } from "next/server";
import { createClient } from "contentful-management";

// Create a Contentful Management API client
const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN!,
});

export async function POST(req: Request) {
  try {
    // Get form data from the request
    const body = await req.formData();
    const title = body.get("title") as string;
    const price = body.get("price") as string;
    const location = body.get("location") as string;
    const description = body.get("description") as string;

    // Get uploaded files
    const imageFiles = body.getAll("images") as File[];

    // Connect to Contentful space & environment
    const space = await contentfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

    // Store asset links for the entry
    const assetLinks: any[] = [];

    // Upload each image file (up to 10)
    for (const file of imageFiles.slice(0, 10)) {
      // Convert browser File → Buffer
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // Upload the binary data to Contentful
      const upload = await environment.createUpload({ file: buffer });

      // Create an asset linked to that upload
      const asset = await environment.createAsset({
        fields: {
          title: { "en-US": file.name },
          file: {
            "en-US": {
              fileName: file.name,
              contentType: file.type,
              uploadFrom: {
                sys: { type: "Link", linkType: "Upload", id: upload.sys.id },
              },
            },
          },
        },
      });

      // Process and publish the asset
      await asset.processForAllLocales();
      const published = await asset.publish();

      // Add the asset link to the array
      assetLinks.push({
        sys: { type: "Link", linkType: "Asset", id: published.sys.id },
      });
    }

    // Finally, create the eProperty entry and link uploaded assets
    const entry = await environment.createEntry("eproperty", {
      fields: {
        title: { "en-US": title },
        price: { "en-US": Number(price) },
        location: { "en-US": location },
        description: { "en-US": description },
        images: { "en-US": assetLinks },
      },
    });

    // Publish the new entry
    await entry.publish();

    return NextResponse.json({
      success: true,
      entryId: entry.sys.id,
      message: "Property posted successfully!",
    });
  } catch (error: any) {
    console.error("Error posting property:", error);
    return NextResponse.json(
      { error: error.message || "Failed to post property" },
      { status: 500 }
    );
  }
}
