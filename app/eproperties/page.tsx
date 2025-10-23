import Link from "next/link";
import Image from "next/image";

export default async function PropertiesPage() {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
  const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
  const CONTENTFUL_ENVIRONMENT = "master";

  const res = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=eProperty&include=2`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const data = await res.json();

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-7xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        {/* Heading */}
        <div className="text-center mb-14">
          <h2
            className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            bg-clip-text text-transparent animate-gradientWave"
          >
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
              <Link
                key={slug}
                href={`/properties/propdetails/${slug}`}
                className="group flex flex-col items-center rounded-2xl border border-gray-200 
                  shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden bg-white
                  transform hover:-translate-y-2"
              >
                {/* Image */}
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

                {/* Title */}
                <div className="p-6 text-center">
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-purple-600 transition-colors">
                    {title}
                  </h3>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
