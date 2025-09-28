import { createClient, Entry } from "contentful";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// Fetch all blogs (for listing)
export async function fetchBlogs() {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      order: ["-sys.createdAt"], // newest first
    });
    return response.items;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
}

// Fetch a single blog by slug (for detail page)
export async function fetchBlogPost(slug: string) {
  try {
    const response = await client.getEntries({
      content_type: "blogPost",
      limit: 1,
      "fields.slug": slug,
    });

    if (response.items.length > 0) {
      return response.items[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}
export default client;
