import Link from "next/link";
import { BlogQueryResult, PropQueryResult } from "../../app/types";


import { createClient } from "contentful";

const client = createClient({
  space: "ghxp9r5ui85n",
  accessToken: "9276aed838db6b7ac88ee1d2fad33f33e3f98cef0dc6b44504f2281a420e5358",
});

const getPropEntries = async (): Promise<PropQueryResult> => {
  const entries = await client.getEntries({ content_type: "property" });
  return entries as unknown as PropQueryResult;
};

export default async function Home() {
  const propEntries = await getPropEntries();

  return (
    
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
          
      <div
        className="w-full max-w-5xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-12 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Hot Properties
        </h1>
         {/* Top-right link */}
      <div className="flex justify-end mb-6">

        <Link
              href="/pages/book-an-expert"
              className="px-6 py-3 rounded-xl shadow-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                         hover:opacity-90 transition text-center sm:text-left"
            >
              Book Our Expert
         </Link>
       
      </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {propEntries.items.map(( pty ) => {
            const { ptitle, slug, image} = pty.fields;
            const imgUrl =  image.fields.file.url;
            console.log("URL" + imgUrl);
            

            return (
              <Link
                key={slug}
                href={`../properties/propdetails/${slug}`}
                className="group rounded-xl bg-white shadow-md hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                <img
                  src={imgUrl}
                  alt={ptitle}
                  className="w-full h-48 object-cover"
                />
               
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800 group-hover:text-purple-600">
                    {ptitle}
                  </h2>
                  
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
