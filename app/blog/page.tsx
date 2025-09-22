"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "../lib/contentful";
import { getHeroUrl, safeString } from "../lib/contentful-helpers";

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  // Separate English and Telugu blogs
  const englishBlogs = blogs.filter(
    (blog) => safeString(blog.fields.language) === "English"
  );
  const teluguBlogs = blogs.filter(
    (blog) => safeString(blog.fields.language) === "Telugu"
  );

  // Tab state
  const [activeTab, setActiveTab] = useState<"English" | "Telugu">("English");

  // Select blogs based on active tab
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

          // Safe values
          const safeSlug = safeString(slug, `blog-${index}`);
          const safeTitle = safeString(title, "Untitled Blog");
          const safeDescription = safeString(description);
          const heroUrl = getHeroUrl(heroImage);

          return (
            <Link
              key={safeSlug} // ✅ safe key
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
