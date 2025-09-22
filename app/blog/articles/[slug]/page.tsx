import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import Link from "next/link";
import { fetchBlogPost } from "../../../lib/contentful";
import { Asset, EntrySkeletonType } from "../../../contentful";

interface BlogPageProps {
  params: { slug: string };
}

// Helper: Always return a safe string
function safeString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

// Helper: Get hero image URL safely
function getHeroUrl(heroImage: unknown): string | undefined {
  const asset = heroImage as Asset | undefined;
  const url = asset?.fields?.file?.url;
  if (typeof url === "string") {
    return url.startsWith("http") ? url : `https:${url}`;
  }
  return undefined;
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = params;
  const blog = await fetchBlogPost(slug);

  if (!blog) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-12 text-center">
        <h1 className="text-3xl font-bold mb-4">Blog post not found</h1>
        <Link href="/blog" className="text-blue-500 hover:underline">
          ← Back to Blog
        </Link>
      </div>
    );
  }

  const { title, body, heroImage, language } = blog.fields;

  const safeTitle = safeString(title, "Untitled Blog");
  const safeLanguage = safeString(language, "Unknown");
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
      <h1 className="text-4xl font-bold mb-4">{safeTitle}</h1>

      {/* Blog Body */}
      <div className="prose prose-lg text-gray-700 mb-6">
        {body && documentToReactComponents(body as any, {
          renderNode: {
            [BLOCKS.PARAGRAPH]: (node, children) => <p>{children}</p>,
          },
        })}
      </div>

      {/* Back Link */}
      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog ({safeLanguage})
      </Link>
    </div>
  );
}
