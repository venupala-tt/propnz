
import { createClient } from "contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import { BlogItem } from "../../../../app/types";
import Link from "next/link";

const client = createClient({
  accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
  space: "ghxp9r5ui85n",
});

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "blogPost",
    select: "fields.slug",
  };

  const articles = await client.getEntries(queryOptions);

  return articles.items.map((article) => ({
    slug: article.fields.slug,
    fallback: "false",
  }));
}

const fetchBlogPost = async (slug: string): Promise<BlogItem> => {
  const queryOptions = {
    content_type: "blogPost",
    "fields.slug[match]": slug,
  };

  const queryResult = await client.getEntries(queryOptions);
  return queryResult.items[0] as unknown as BlogItem;
};

type BlogPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const article = await fetchBlogPost(slug);
  const { title, date, heroImage, body } = article.fields;

  const imageUrl = heroImage?.fields?.file?.url
    ? `https:${heroImage.fields.file.url}`
    : "/default-blog.jpg";

  // Custom renderer to handle embedded assets
  const options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const { file, title, description } = node.data.target.fields;
        const imageUrl = file.url ? `https:${file.url}` : "";
        return (
          <div className="my-6 flex justify-center">
            <img
              src={imageUrl}
              alt={description || title || "Embedded Asset"}
              className="rounded-lg shadow-md max-w-full h-auto"
            />
          </div>
        );
      },
    },
  };

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-3xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-4 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          {title}
        </h1>

        <p className="mb-6 text-sm text-gray-500 text-center">
          Posted on{" "}
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        {/* Render rich text with embedded assets */}
        <div className="prose prose-lg max-w-none text-gray-700">
          {documentToReactComponents(body, options)}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/blog"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
            transition-all duration-300 animate-fadeInBounce"
          >
            ? Back to Blog
          </Link>
        </div>
      </div>
    </main>
  );
}
