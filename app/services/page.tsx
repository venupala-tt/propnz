import Link from "next/link";
import { Hammer, Zap, Home, PenTool, FileText, Compass } from "lucide-react";

export default function ServicesPage() {
  const services = [
    {
      slug: "construction-planning",
      title: "Construction Planning Services",
      icon: <Hammer size={24} />,
      description: "Professional planning for residential and commercial projects.",
      image: "/construction-planning.jpg",
    },
   
    {
      slug: "interior-designer",
      title: "Interior Designing",
      icon: <PenTool size={24} />,
      description: "Creative and functional designs tailored to your taste.",
      image: "/interior-designer.jpg",
    },
     {
      slug: "vaastu-services",
      title: "Vaastu Services",
      icon: <Compass size={24} />,
      description: "Enhance harmony and prosperity with professional Vaastu advice.",
      image: "/vaastu.jpg",
    },
    {
      slug: "property-documentation",
      title: "Property Documentation Services",
      icon: <FileText size={24} />,
      description: "Expert handling of all property-related documentation.",
      image: "/property-docs.jpg",
    },
   
    
    {
      slug: "flat-ready-services",
      title: "Flat-Ready-Services",
      icon: <Home size={24} />,
      description: "Comprehensive finishing services to make your flat move-in ready.",
      image: "/flat-ready.jpg",
    },
  ];

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-6xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        <h2
          className="text-3xl sm:text-4xl font-bold text-center mb-12 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Our Services
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={`/services/${service.slug}`}
              className="group p-6 rounded-xl bg-white shadow-md hover:shadow-xl 
              transition-all duration-300 transform hover:-translate-y-2"
            >
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-40 object-cover rounded-lg mb-4"
              />
              <div className="flex items-center gap-3 mb-2 text-blue-600">
                <div className="flex items-center justify-center w-12 h-12 rounded-full 
                  bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800">{service.title}</h3>
              </div>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
