// app/blog/articles/[slug]/page.tsx
import Link from "next/link";
import { fetchBlogBySlug } from "../../../lib/contentful";
import { getHeroUrl, safeString } from "../../../lib/contentful-helpers";

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

      {/* Blog Body */}
      <div className="prose prose-lg text-gray-700 mb-6">{body}</div>

      {/* Back Link */}
      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog ({language})
      </Link>
    </div>
  );
}
