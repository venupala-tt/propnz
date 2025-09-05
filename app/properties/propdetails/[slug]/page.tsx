// crash proof code
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

const SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
const TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
const ENV = "master";

type Property = {
  id: string;
  title: string;
  description: Document | string | null;
  location: string;
  imageUrl: string | null;
};

async function getProperty(slug: string): Promise<Property | null> {
  const res = await fetch(
    `https://cdn.contentful.com/spaces/${SPACE_ID}/environments/${ENV}/entries?access_token=${TOKEN}&content_type=property&fields.slug=${slug}&include=2&limit=1`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    console.error("Contentful fetch failed", res.status);
    return null;
  }

  const data = await res.json();
  if (!data.items?.length) return null;

  const fields = data.items[0].fields || {};

  // Safe title
  const title: string = fields.title || "Untitled Property";

  // Handle description (rich text or plain text)
  const description: Document | string | null =
    fields.description && typeof fields.description === "object"
      ? (fields.description as Document)
      : typeof fields.description === "string"
      ? fields.description
      : null;

  // Safe location
  const location: string = fields.location || "";

  // Resolve image
  let imageUrl: string | null = null;
  const imageId = fields.image?.sys?.id;
  if (imageId && data.includes?.Asset) {
    const asset = data.includes.Asset.find((a: any) => a.sys.id === imageId);
    if (asset?.fields?.file?.url) {
      imageUrl = `https:${asset.fields.file.url}`;
    }
  }

  return {
    id: data.items[0].sys.id,
    title,
    description,
    location,
    imageUrl,
  };
}

export default async function PropertyPage({ params }: { params: { slug: string } }) {
  const property = await getProperty(params.slug);

  if (!property) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-white shadow-md rounded-xl p-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/properties"
            className="inline-block px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 rounded-lg shadow hover:opacity-90 transition"
          >
            ← Back to Properties
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">{property.title}</h1>

        {/* Image */}
        {property.imageUrl && (
          <div className="relative w-full h-64 mb-6">
            <Image
              src={property.imageUrl}
              alt={property.title}
              fill
              className="object-cover rounded-lg shadow"
              sizes="(max-width: 768px) 100vw,
                     (max-width: 1200px) 80vw,
                     800px"
            />
          </div>
        )}

        {/* Description */}
        {property.description && (
          <div className="prose prose-lg max-w-none mb-6">
            {typeof property.description === "string" ? (
              <p>{property.description}</p>
            ) : (
              documentToReactComponents(property.description as Document)
            )}
          </div>
        )}

        {/* Location */}
        {property.location && (
          <p className="text-sm text-gray-500">📍 {property.location}</p>
        )}
      </div>
    </main>
  );
}
