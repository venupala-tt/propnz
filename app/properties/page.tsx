// new
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      {/* Page Heading */}
      <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >        Trending Properties
      </h2>

      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="group rounded-xl bg-white shadow-md hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              {/* Image as clickable link */}
              <Link href={`/properties/propdetails/${slug}`}>
                <div className="relative w-full h-48">
                  <Image
                    src={imgUrl}
                    alt={title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw,
                           (max-width: 1200px) 50vw,
                           33vw"
                  />
                </div>
              </Link>

              {/* Title as clickable link */}
              <div className="p-6">
                <Link
                  href={`/properties/propdetails/${slug}`}
                  className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600 hover:underline"
                >
                  {title}
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
