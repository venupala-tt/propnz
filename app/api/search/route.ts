import { NextResponse } from "next/server";
import { createClient } from "contentful";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const query = searchParams.get("q") || "";

  if (!query) {
    return NextResponse.json([]);
  }

	  try {

	  const client = createClient({
	    space: "ghxp9r5ui85n",
	    accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
	  });

  
  
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
