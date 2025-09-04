import { NextResponse } from "next/server";
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    const entries = await client.getEntries({
      content_type: "property",
      query: q,
    });

    const results = entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled",
      description: item.fields.description || "",
      location: item.fields.location || "",
    }));

    return NextResponse.json(results); // ✅ always return an array
  } catch (err: any) {
    console.error("Contentful API Error:", err.message || err);
    // ✅ return empty array instead of error object
    return NextResponse.json([], { status: 200 });
  }
}
