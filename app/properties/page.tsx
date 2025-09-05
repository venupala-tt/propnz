import Link from "next/link";
import Image from "next/image";

export default async function PropertiesPage() {
  const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID!;
  const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN!;
  const CONTENTFUL_ENVIRONMENT = "master";

  const res = await fetch(
    `https://cdn.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/${CONTENTFUL_ENVIRONMENT}/entries?access_token=${CONTENTFUL_ACCESS_TOKEN}&content_type=property&include=1`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch properties");
  }

  const propEntries = await res.json();

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-6 flex flex-col items-center">
      <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {propEntries.items.map((pty: any) => {
          const { title, slug, image } = pty.fields;

          // ✅ prepend https:
            const imgUrl =  image.fields.file.url;

     //     const imgUrl = testimgUrl
         //   ? `https:${image.fields.file.url}`
         //   : "/placeholder.png";

          return (
            <Link
              key={slug}
              href={`/properties/propdetails/${slug}`}
              className="group rounded-xl bg-white shadow-md hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
            >
              <div className="relative w-full h-48">
                <Image
                  src={imgUrl}
                  alt={title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 
                         (max-width: 1200px) 50vw, 
                         33vw"
                  priority={false}
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600">
                  {title}
                </h2>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
