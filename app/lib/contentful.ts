// lib/contentful.ts
import { createClient } from "contentful";

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,      // Your Contentful Space ID
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!, // Your Contentful Access Token
  // environment: "master", // Optional if using non-default environment
});

// Fetch all blogs
export async function fetchBlogs() {
  const entries = await client.getEntries({
    content_type: "blog",
    order: "-fields.date", // newest first
  });
  return entries.items;
}

// Fetch a single blog by slug
export async function fetchBlogBySlug(slug: string) {
  const entries = await client.getEntries({
    content_type: "blog",
    "fields.slug": slug,
  });
  return entries.items[0];
}
