import Link from "next/link";
import { fetchBlogPost } from "../../../lib/contentful";
import { getHeroUrl, safeString } from "../../../lib/contentful-helpers";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document, BLOCKS, INLINES } from "@contentful/rich-text-types";

interface BlogFields {
  slug: string;
  title: string;
  description: string;
  heroImage?: any;
  language?: string;
  body?: Document;
}

interface BlogItem {
  sys: { id: string };
  fields: BlogFields;
}

interface BlogPageProps {
  params: { slug: string };
}

export default async function BlogSlugPage({ params }: BlogPageProps) {
  const { slug } = params;
  const blog: BlogItem | null = await fetchBlogPost(slug);

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

  const renderOptions = {
    renderNode: {
      [BLOCKS.HEADING_1]: (_node: any, children: any) => (
        <h1 className="text-3xl font-bold my-4">{children}</h1>
      ),
      [BLOCKS.HEADING_2]: (_node: any, children: any) => (
        <h2 className="text-2xl font-semibold my-3">{children}</h2>
      ),
      [BLOCKS.PARAGRAPH]: (_node: any, children: any) => (
        <p className="mb-3 text-gray-700">{children}</p>
      ),
      [BLOCKS.UL_LIST]: (_node: any, children: any) => (
        <ul className="list-disc ml-6 mb-3">{children}</ul>
      ),
      [BLOCKS.OL_LIST]: (_node: any, children: any) => (
        <ol className="list-decimal ml-6 mb-3">{children}</ol>
      ),
      [BLOCKS.LIST_ITEM]: (_node: any, children: any) => <li>{children}</li>,
      [INLINES.HYPERLINK]: (node: any, children: any) => (
        <a
          href={node.data.uri}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline"
        >
          {children}
        </a>
      ),
    },
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {heroUrl && (
        <img
          src={heroUrl}
          alt={safeTitle}
          className="w-full h-64 object-cover rounded mb-6"
        />
      )}

      <h1 className="text-4xl font-bold mb-6">{safeTitle}</h1>

      {body && (
        <div className="prose prose-lg text-gray-700 mb-6">
          {documentToReactComponents(body, renderOptions)}
        </div>
      )}

      <Link href="/blog" className="text-blue-500 hover:underline">
        ← Back to Blog ({safeLanguage})
      </Link>
    </div>
  );
}
