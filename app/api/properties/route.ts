import { NextResponse } from "next/server";
import { createClient } from "contentful-management";

const contentfulClient = createClient({
  accessToken: process.env.CONTENTFUL_CMA_TOKEN!,
});

export async function POST(req: Request) {
  try {
    const body = await req.formData();
    const title = body.get("title") as string;
    const price = body.get("price") as string;
    const location = body.get("location") as string;
    const description = body.get("description") as string;

    const space = await contentfulClient.getSpace(process.env.CONTENTFUL_SPACE_ID!);
    const environment = await space.getEnvironment(process.env.CONTENTFUL_ENVIRONMENT!);

    // Upload each image to Contentful
    const imageFiles = body.getAll("images") as File[];
    const assetLinks = [];

    for (const file of imageFiles.slice(0, 10)) {
      const upload = await environment.createUpload({ file });
      const asset = await environment.createAsset({
        fields: {
          title: { 'en-US': file.name },
          file: {
            'en-US': {
              fileName: file.name,
              contentType: file.type,
              uploadFrom: { sys: { type: 'Link', linkType: 'Upload', id: upload.sys.id } },
            },
          },
        },
      });
      await asset.processForAllLocales();
      const published = await asset.publish();
      assetLinks.push({ sys: { type: "Link", linkType: "Asset", id: published.sys.id } });
    }

    // Create eProperty entry
    const entry = await environment.createEntry("eproperty", {
      fields: {
        title: { "en-US": title },
        price: { "en-US": Number(price) },
        location: { "en-US": location },
        description: { "en-US": description },
        images: { "en-US": assetLinks },
      },
    });

    await entry.publish();

    return NextResponse.json({ success: true, entryId: entry.sys.id });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
