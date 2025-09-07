import Link from "next/link";
import { notFound } from "next/navigation";

const services = {
   "digital-services": {
    title: "Digital Services for Real Estate",
    image: "/digital-services.png",
    description:
      "Digital Services for Real Estate for residential, commercial, and industrial construction projects.",
    details: [
      "Flyers",
      "Websites",
      "Data Analysis",
    ],
  },
  "construction-planning": {
    title: "Construction Planning Services",
    image: "/construction-planning.jpg",
    description:
      "We offer detailed planning and execution strategies for residential, commercial, and industrial construction projects.",
    details: [
      "Site assessment and feasibility analysis",
      "Budget and timeline preparation",
      "Material sourcing and contractor coordination",
    ],
  },
  "electricity-bill-mutation": {
    title: "Electricity Bill Name Change Mutation",
    image: "/electricity-bill.jpg",
    description:
      "Simplifying the process of changing the name on your electricity bill.",
    details: [
      "Document collection and verification",
      "Filing with electricity board",
      "Follow-up until completion",
    ],
  },
  "flat-ready-services": {
    title: "Flat-Ready-Services",
    image: "/flat-ready.jpg",
    description:
      "From flooring to fittings, we make your new flat move-in ready.",
    details: ["Painting and finishing", "Electrical fittings", "Plumbing work"],
  },
  "interior-designer": {
    title: "Interior Designer",
    image: "/interior-designer.jpg",
    description:
      "Customized interior designs that blend functionality with style.",
    details: [
      "Space planning",
      "Furniture and decor selection",
      "Lighting and ambiance design",
    ],
  },
  "property-documentation": {
    title: "Property Documentation Services",
    image: "/property-docs.jpg",
    description:
      "Professional support for all your property documentation needs.",
    details: [
      "Sale deed drafting",
      "Registration assistance",
      "Encumbrance certificate procurement",
    ],
  },
  "vaastu-services": {
    title: "Vaastu Services",
    image: "/vaastu.jpg",
    description:
      "Expert Vaastu consultation for homes, offices, and factories.",
    details: [
      "Site layout analysis",
      "Directional recommendations",
      "Remedial solutions",
    ],
  },
};

export default function ServiceDetailPage({ params }: { params: { slug: string } }) {
  const service = services[params.slug];

  if (!service) {
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
          src={service.image}
          alt={service.title}
          className="w-full h-56 object-cover rounded-xl mb-6"
        />
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          {service.title}
        </h1>
        <p className="text-gray-700 text-lg mb-6">{service.description}</p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-8">
          {service.details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-block px-6 py-3 rounded-lg font-semibold text-white 
            bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
            hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
            transition-all duration-300 animate-fadeInBounce"
          >
            ← Back to Services
          </Link>
        </div>
      </div>
    </main>
  );
}
