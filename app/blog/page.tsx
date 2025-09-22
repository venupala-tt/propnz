"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "../lib/contentful";
import { getHeroUrl, safeString } from "../lib/contentful-helpers";

interface BlogFields {
  slug: string;
  title: string;
  description: string;
  heroImage?: any;
  language?: string;
}

interface BlogItem {
  fields: BlogFields;
}

export default function BlogPage() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [activeTab, setActiveTab] = useState<"English" | "Telugu">("English");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogs = async () => {
      try {
        const items = await fetchBlogs();
        setBlogs(items);
      } catch (error) {
        console.error("Failed to fetch blogs:", error);
      } finally {
        setLoading(false);
      }
    };
    loadBlogs();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8 text-center">
        Loading blogs...
      </div>
    );
  }

  const englishBlogs = blogs.filter(
    (blog) => safeString(blog.fields.language) === "English"
  );
  const teluguBlogs = blogs.filter(
    (blog) => safeString(blog.fields.language) === "Telugu"
  );

  const activeBlogs = activeTab === "English" ? englishBlogs : teluguBlogs;

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={() => setActiveTab("English")}
          className={`px-4 py-2 rounded ${
            activeTab === "English"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          English
        </button>
        <button
          onClick={() => setActiveTab("Telugu")}
          className={`px-4 py-2 rounded ${
            activeTab === "Telugu"
              ? "bg-blue-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
        >
          తెలుగు
        </button>
      </div>

      {/* Blog list */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeBlogs.map((blog, index) => {
          const { slug, title, description, heroImage } = blog.fields;
          const safeSlug = safeString(slug, `blog-${index}`);
          const safeTitle = safeString(title, "Untitled Blog");
          const safeDescription = safeString(description);
          const heroUrl = getHeroUrl(heroImage);

          return (
            <Link
              key={safeSlug}
              href={`/blog/articles/${safeSlug}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              {heroUrl && (
                <img
                  src={heroUrl}
                  alt={safeTitle}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{safeTitle}</h2>
                <p className="text-gray-600">{safeDescription}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
