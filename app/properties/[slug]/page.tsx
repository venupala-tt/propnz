/* app/properties/[slug]/page.tsx */

import {fetchPropertyBySlug} from "../../lib/contentful";

import Image from "next/image";
import { notFound } from "next/navigation";

export const revalidate = 60; // revalidate every 60s

// Generate static paths for ISR
export async function generateStaticParams() {
  const properties = await fetchPropertyBySlug(params.slug);
  return properties.map((item: any) => ({
    slug: item.fields.slug,
  }));
}

// Dynamic metadata for SEO
export async function generateMetadata({ params }: any) {
  const property = await fetchPropertyBySlug(params.slug);
  if (!property) return {};

  const { title, description } = property.fields;
  return {
    title: `${title} | Propmatics`,
    description: description || "View property details on Propmatics.",
  };
}

export default async function PropertyDetailPage({ params }: { params: { slug: string } }) {
  const property = await fetchPropertyBySlug(params.slug);
  if (!property) return notFound();

  const { title, price, location, description, images } = property.fields;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-2">{title}</h1>
      <p className="text-gray-600 mb-2">{location}</p>
      <p className="text-xl font-semibold text-blue-600 mb-4">
        ?{price?.toLocaleString()}
      </p>

      {/* Image Gallery */}
      {images?.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {images.map((img: any) => (
            <Image
              key={img.sys.id}
              src={`https:${img.fields.file.url}`}
              alt={title}
              width={500}
              height={400}
              className="rounded-lg object-cover w-full h-64"
            />
          ))}
        </div>
      )}

      <div className="bg-gray-50 p-4 rounded-xl shadow-sm">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-800 leading-relaxed whitespace-pre-line">{description}</p>
      </div>

      <div className="mt-6">
        <a
          href="/properties"
          className="text-blue-600 underline hover:text-blue-800"
        >
          ? Back to all properties
        </a>
      </div>
    </div>
  );
}
