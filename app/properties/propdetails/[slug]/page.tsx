import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  documentToReactComponents,
  Options,
} from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const CONTENTFUL_ENVIRONMENT = "master";

type Property = {
  id: string;
  title: string;
  description: Document | string | null;
  imageUrl: string | null;
};

async function getProperty(slug: string): Promise<Property | null> {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=property&fields.slug=${slug}&include=2&limit=1`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Failed to fetch property", res.status);
    return null;
  }

  const data = await res.json();
  if (!data.items?.length) {
    return null;
  }

  const property = data.items[0];
  const fields = property.fields || {};

  const title: string = fields.title || "Untitled";
  const description: Document | string | null = fields.description || null;

  let imageUrl: string | null = null;
  const imageId = fields.image?.sys?.id;
  if (imageId && data.includes?.Asset) {
    const asset = data.includes.Asset.find((a: any) => a.sys.id === imageId);
    if (asset?.fields?.file?.url) {
      imageUrl = `https:${asset.fields.file.url}`;
    }
  }

  return {
    id: property.sys.id,
    title,
    description,
    imageUrl,
  };
}

export default async function PropertyPage({
  params,
}: {
  params: { slug: string };
}) {
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  // Custom render options for images & videos in Contentful Rich Text
  const options: Options = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node: any) => {
        const file = node.data.target.fields?.file;
        if (!file) return null;

        const url = file.url.startsWith("https:")
          ? file.url
          : `https:${file.url}`;
        const contentType = file.contentType || "";

        // Handle images
        if (contentType.startsWith("image/")) {
          return (
            <div className="my-6 flex justify-center">
              <Image
                src={url}
                alt={node.data.target.fields?.title || "Embedded image"}
                width={800}
                height={600}
                className="rounded-lg shadow-md object-contain"
              />
            </div>
          );
        }

        // Handle videos
        if (contentType.startsWith("video/")) {
          return (
            <div className="my-6">
              <video
                controls
                className="w-full rounded-lg shadow-md"
                src={url}
              />
            </div>
          );
        }

        // Fallback for other file types
        return (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            {file.fileName}
          </a>
        );
      },
    },
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl overflow-hidden">
        {/* Back Button */}
        <div className="p-4">
          <Link
            href="/properties"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-lg shadow hover:opacity-90 transition"
          >
            ← Back to Properties
          </Link>
        </div>

        {/* Main Image */}
        {property.imageUrl && (
          <div className="relative w-full h-64 sm:h-96">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 80vw,
                     1000px"
            />
          </div>
        )}

        {/* Title + Description */}
        <div className="p-6">
          <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-gray-800">
            {property.title}
          </h1>

          {property.description && (
            <div className="prose prose-lg max-w-none text-gray-700">
              {typeof property.description === "string" ? (
                <p>{property.description}</p>
              ) : (
                documentToReactComponents(property.description as Document, options)
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
