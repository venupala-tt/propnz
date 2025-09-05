
/* PROP DETAILS PAGE */
import { createClient } from "contentful";
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import { PropItem } from "../../../../app/types";
import Link from "next/link";

const client = createClient({
  accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
  space: "ghxp9r5ui85n",
});

export async function generateStaticParams() {
  const queryOptions = {
    content_type: "property",
    select: "fields.slug",
  };

  const properties = await client.getEntries(queryOptions);

  return properties.items.map((property) => {
    return ({
      slug: property.fields.slug,
      fallback: 'false'
    });
  });

}

const fetchPropPost = async (slug: string): Promise<PropItem> => {
  const queryOptions = {
    content_type: "property",
    "fields.slug[match]": slug
  };

  // console.log("QO: " + queryOptions);
  const queryResult = await client.getEntries(queryOptions);

  return queryResult.items[0] as unknown as PropItem;
};

type PropPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function PropPage({ params }: PropPageProps) {
  const { slug } = await params;
  const propdetail = await fetchPropPost(slug);
  const pt  = propdetail.fields.ptitle;
    const pd  = propdetail.fields.description;

// 🔹 Find the linked asset in "includes.Asset"
          let imgUrl = "/placeholder.png";
          if (image?.sys?.id && data.includes?.Asset) {
            const asset = data.includes.Asset.find(
              (a: any) => a.sys.id === image.sys.id
            );
            if (asset?.fields?.file?.url) {
              imgUrl = `https:${asset.fields.file.url}`;
            }
          }
  
  
  
  // const imageUrl = heroImage?.fields?.file?.url
  // const imageUrl = propdetail.fields.heroImage
     //         ? `https:${propdetail.fields.heroImage}`
       //       : "/default-blog.jpg"; 


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
        
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-4 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          {pt}
        </h1>

    

        <div className="prose prose-lg max-w-none text-gray-700">
          {documentToReactComponents(pd)}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/properties"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
            transition-all duration-300 animate-fadeInBounce"
          >
            ← Back to Properties
          </Link>
        </div>
      </div>
    </main>
  );
}
