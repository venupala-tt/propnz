import { fetchBlogBySlug } from "@/lib/contentful";
import Link from "next/link";

interface BlogProps {
  params: { slug: string };
}

export default async function BlogSlugPage({ params }: BlogProps) {
  const { slug } = params;
  const blog = await fetchBlogBySlug(slug);

  if (!blog) return <p>Blog not found</p>;

  const { title, body, heroImage, language } = blog.fields;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <img
        src={heroImage.fields.file.url}
        alt={title}
        className="w-full h-64 object-cover rounded mb-6"
      />
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-gray-700 mb-6">{body}</p>

      <Link
        href="/blog"
        className="text-blue-500 hover:underline"
      >
        ← Back to Blog ({language})
      </Link>
    </div>
  );
}
