import { NextResponse } from "next/server";
import { createClient } from "contentful";

const client = createClient({
  space: "ghxp9r5ui85n",
  accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
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
