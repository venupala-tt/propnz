import { NextResponse } from "next/server";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const CONTENTFUL_ENVIRONMENT = "master";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q")?.toLowerCase() || "";

  if (!query || query.length < 2) {
    return NextResponse.json([]);
  }

  try {
    const res = await fetch(
      `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=property&query=${encodeURIComponent(
        query
      )}`
    );

    const data = await res.json();

    const results = data.items.map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title,
      // ✅ Fixed path
      slug: `/properties/propdetails/${item.fields.slug}`,
    }));

    return NextResponse.json(results);
  } catch (error) {
    console.error("Contentful search error:", error);
    return NextResponse.json({ error: "Failed to fetch search results" }, { status: 500 });
  }
}
