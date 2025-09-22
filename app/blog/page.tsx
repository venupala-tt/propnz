"use client"; // Required for useState

import { useState, useEffect } from "react";
import Link from "next/link";
import { fetchBlogs } from "../lib/contentful";

export default function BlogPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<"English" | "Telugu">("English");

  useEffect(() => {
    async function loadBlogs() {
      const allBlogs = await fetchBlogs();
      setBlogs(allBlogs);
    }
    loadBlogs();
  }, []);

  const filteredBlogs = blogs.filter(blog => blog.fields.language === activeTab);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Tabs */}
      <div className="flex space-x-4 mb-6">
        {["English", "Telugu"].map(tab => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${activeTab === tab ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab(tab as "English" | "Telugu")}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Blog List */}
      <div className="grid md:grid-cols-2 gap-6">
        {filteredBlogs.length === 0 && <p>No blogs available in {activeTab}</p>}
        {filteredBlogs.map(blog => (
          <div key={blog.sys.id} className="border rounded p-4 shadow-sm">
            <img
              src={blog.fields.heroImage.fields.file.url}
              alt={blog.fields.title}
              className="w-full h-48 object-cover rounded"
            />
            <h2 className="text-xl font-bold mt-2">{blog.fields.title}</h2>
            <p className="mt-1 text-gray-700">{blog.fields.description}</p>
            <Link
              href={`/blog/${blog.fields.slug}`}
              className="text-blue-500 mt-2 inline-block"
            >
              Read More
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
