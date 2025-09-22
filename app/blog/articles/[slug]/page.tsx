// app/blog/articles/[slug]/page.tsx
import Link from "next/link";
import { fetchBlogBySlug } from "../../../lib/contentful";
import { getHeroUrl, safeString } from "../../../lib/contentful-helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogSlugPage({ params }: BlogPageProps) {
  const { slug } = params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <p className="text-red-500">Blog not found.</p>
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const { title, body, heroImage, language } = blog.fields;

  const safeTitle = safeString(title, "Untitled Blog");
  const heroUrl = getHeroUrl(heroImage);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Hero Image */}
      {heroUrl && (
        <img
          src={heroUrl}
          alt={safeTitle}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      {/* Blog Title */}
      <h1 className="text-3xl font-bold mb-4">{safeTitle}</h1>

      {/* Blog Body (Rich Text) */}
      <div className="prose prose-lg text-gray-700 mb-6">
        {documentToReactComponents(body as Document)}
      </div>

      {/* Back Link */}
      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog ({language})
      </Link>
    </div>
  );
}
