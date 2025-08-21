import Link from "next/link";
import { BlogQueryResult } from "./types";
import { createClient } from "contentful";

const client = createClient({
  space: "ghxp9r5ui85n",
  accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
});

const getBlogEntries = async (): Promise<BlogQueryResult> => {
  const entries = await client.getEntries({ content_type: "blogPost" });
  return entries as unknown as BlogQueryResult;
};

export default async function Home() {
  const blogEntries = await getBlogEntries();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {blogEntries.items.map((singlePost) => {
        const { slug, title, date } = singlePost.fields;

        return (
          <div key={slug}>
            <Link href={`/articles/${slug}`}>
              <h2>{title}</h2>
              <span>
                Posted on{" "}
                {new Date(date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </Link>
          </div>
        );
      })}
    </main>
  );
}