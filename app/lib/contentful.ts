import { createClient, Entry } from "contentful";

// Create Contentful client
const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID!,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN!,
});

// -------------------- BLOGS --------------------

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

// -------------------- NOTIFICATIONS --------------------

export async function fetchNotifications(limit = 10) {
  try {
    const response = await client.getEntries({
      content_type: "notification",
      order: ["-fields.date"], // latest first
      limit,
    });

    return response.items.map((item: any) => {
      const date = item.fields.date
        ? new Date(item.fields.date).toLocaleDateString("en-GB")
        : "";

      return {
        date,
        title: item.fields.title || "",
        subject: item.fields.subject || "",
        url: item.fields.document?.fields?.file?.url
          ? `https:${item.fields.document.fields.file.url}`
          : "#",
      };
    });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return [];
  }
}

// ✅ Fetch all properties (for listing & generateStaticParams)
export async function fetchProperties() {
  const entries = await contentfulClient.getEntries({
    content_type: "property",
    order: "-sys.createdAt",
  });
  return entries.items;
}

// ✅ Fetch single property by slug
export async function fetchPropertyBySlug(slug: string) {
  const entries = await contentfulClient.getEntries({
    content_type: "property",
    "fields.slug": slug,
    limit: 1,
  });

  return entries.items[0];
}



export default client;
