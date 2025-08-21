import Link from "next/link";
import { notFound } from "next/navigation";

const products = {
  "junction-box": {
    title: "Junction Box",
    image: "/junction-box.jpg",
    description:
      "Our junction boxes are built from high-quality materials, ensuring safety and durability in all electrical installations.",
    details: [
      "Material: High-grade PVC",
      "Weatherproof & dustproof",
      "Multiple entry points for cables",
    ],
  },
  "more-coming-soon": {
	    title: "More Coming Shortly...",
    image: "/coming-soon.jpg",
    description:
      "We are constantly innovating and adding new products to our catalog. Stay tuned for updates!",
    details: ["Exciting designs", "Premium materials", "Modern technology"],
  },
};

export default function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug];

  if (!product) {
    return notFound();
  }

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
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          {product.title}
        </h1>
        <p className="text-gray-700 text-lg mb-6">{product.description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
          {product.details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* Back Button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
            transition-all duration-300 animate-fadeInBounce"
          >
            ← Back to Products
          </Link>
        </div>
      </div>
    </main>
  );
}
