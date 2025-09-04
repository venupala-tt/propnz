import { NextResponse } from "next/server";
import { createClient } from "contentful";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    // Fetch entries from Contentful (content type: property)
    const entries = await client.getEntries({
      content_type: "property",
      query: q,
    });

    // Map Contentful data to the format expected by SearchBar.tsx
    const results = entries.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled",
      description: item.fields.description || "",
      location: item.fields.location || "",
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error("Contentful API Error:", err);
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
