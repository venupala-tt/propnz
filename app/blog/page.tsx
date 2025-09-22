// app/blog/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { fetchBlogs } from "../lib/contentful";
import { Asset, AssetFile } from "contentful";

export default async function BlogPage() {
  const blogs = await fetchBlogs();

  // Separate English and Telugu blogs
  const englishBlogs = blogs.filter(
    (blog) => blog.fields.language === "English"
  );
  const teluguBlogs = blogs.filter(
    (blog) => blog.fields.language === "Telugu"
  );

  // Tab state
  const [activeTab, setActiveTab] = useState<"English" | "Telugu">("English");

  // Helper to extract hero image URL safely
  const getHeroUrl = (heroImage: unknown): string | undefined => {
    const asset = heroImage as Asset | undefined;
    const file = asset?.fields?.file as AssetFile | string | undefined;

    if (typeof file === "object" && file?.url) {
      return file.url.startsWith("http") ? file.url : `https:${file.url}`;
    } else if (typeof file === "string") {
      return file.startsWith("http") ? file : `https:${file}`;
    }
    return undefined;
  };

  // Select blogs based on tab
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
        {activeBlogs.map((blog) => {
          const { slug, title, description, heroImage } = blog.fields;
          const heroUrl = getHeroUrl(heroImage);

          return (
            <Link
              key={slug}
              href={`/blog/articles/${slug}`}
              className="border rounded-lg overflow-hidden shadow hover:shadow-lg transition"
            >
              {heroUrl && (
                <img
                  src={heroUrl}
                  alt={title}
                  className="w-full h-48 object-cover"
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
