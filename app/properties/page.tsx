import Link from "next/link";
import Image from "next/image";

export default async function PropertiesPage() {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
  const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
  const CONTENTFUL_ENVIRONMENT = "master";

  const res = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=property&include=2`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.json();

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Trending Properties
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Explore our curated list of trending properties that fit your investment and lifestyle.
          </p>
        </div>

        {/* Properties Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {data.items.map((pty: any) => {
            const { title, slug, image } = pty.fields;

            let imgUrl = "/placeholder.png";
            if (image?.sys?.id && data.includes?.Asset) {
              const asset = data.includes.Asset.find(
                (a: any) => a.sys.id === image.sys.id
              );
              if (asset?.fields?.file?.url) {
                imgUrl = `https:${asset.fields.file.url}`;
              }
            }

            return (
              <div
                key={slug}
                className="group flex flex-col items-center rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white"
              >
                {/* Image with hover overlay */}
                <Link href={`/properties/propdetails/${slug}`} className="w-full relative">
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={imgUrl}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw,
                             (max-width: 1200px) 50vw,
                             33vw"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>
                </Link>

                {/* Title */}
                <div className="p-6 text-center">
                  <Link
                    href={`/properties/propdetails/${slug}`}
                    className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors"
                  >
                    {title}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
