import { NextResponse } from "next/server";
import { createClient } from "contentful-management";
import { Readable } from "stream"; // ✅ fixed import


// Create a Contentful Management API client
const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN!,
});

export async function POST(req: Request) {
  try {
    // Parse form data
    const body = await req.formData();
    const title = body.get("title") as string;
    const price = body.get("price") as string;
    const location = body.get("location") as string;
    const description = body.get("description") as string;

    const imageFiles = body.getAll("images") as File[];

    // Connect to Contentful space & environment
    const space = await contentfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

    const assetLinks: any[] = [];

    for (const file of imageFiles.slice(0, 10)) {
      // Convert browser File → Node Buffer (binary)
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      // ⚙️ FIX: Convert buffer into a readable stream so TypeScript & SDK both accept it
      const stream = Readable.from(buffer);

      // Upload binary stream to Contentful
      const upload = await environment.createUpload({ file: stream as any });

      // Create an Asset for that upload
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

      // Process and publish the Asset
      await asset.processForAllLocales();
      const published = await asset.publish();

      assetLinks.push({
        sys: { type: "Link", linkType: "Asset", id: published.sys.id },
      });
    }

    // Create the Property entry
    const entry = await environment.createEntry("property", {
      fields: {
        title: { "en-US": title },
        price: { "en-US": Number(price) },
        location: { "en-US": location },
        description: { "en-US": description },
        images: { "en-US": assetLinks },
      },
    });

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
