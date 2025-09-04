import { NextResponse } from "next/server";
import { createClient } from "contentful";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Helper: extract plain text from Contentful Rich Text
function extractTextFromRichText(richText: any): string {
  if (!richText?.content) return "";
  return richText.content
    .map((node: any) =>
      node.content
        ? node.content.map((c: any) => c.value || "").join(" ")
        : ""
    )
    .join(" ")
    .trim();
}

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const q = searchParams.get("q")?.toLowerCase() || "";

    const entries = await client.getEntries({
      content_type: "property",
      query: q,
    });

    const results = (entries.items || []).map((item: any) => ({
      id: item.sys.id,
      title: item.fields.title || "Untitled",
      description: extractTextFromRichText(item.fields.description) || "",
      location: item.fields.city // ✅ Prefer city field
        ? item.fields.city
        : item.fields.location
        ? `${item.fields.location.lat}, ${item.fields.location.lon}`
        : "",
    }));

    return NextResponse.json(results);
  } catch (err) {
    console.error("Contentful API Error:", err);
    return NextResponse.json([]);
  }
}
