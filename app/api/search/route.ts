import { NextResponse } from "next/server";
import client from "lib/contentful";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

  try {
    const entries = await client.getEntries({
      content_type: "property", // change to your Contentful content type ID
      query: query, // full-text search
      limit: 10,
    });

    const results = entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      description: item.fields.description,
      location: item.fields.location,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error fetching from Contentful" }, { status: 500 });
  }
}
