import { Card, CardContent } from "@/components/ui/card";

export default function RealEstateServicesPage() {
  const services = [
    {
      title: "Real Estate Website Development",
      description: "Custom websites with property listings, search filters, and booking forms."
    },
    {
      title: "Landing Page Design",
      description: "High-converting landing pages for property launches and campaigns."
    },
    {
      title: "SEO (Search Engine Optimization)",
      description: "Rank property pages on Google and attract organic buyers."
    },
    {
      title: "PPC Ads Management",
      description: "Google Ads, Facebook, and Instagram ad campaigns for lead generation."
    },
    {
      title: "Email & WhatsApp Marketing",
      description: "Automated campaigns to nurture property leads and drive conversions."
    },
    {
      title: "Social Media Marketing",
      description: "Grow presence on Instagram, Facebook, LinkedIn, and YouTube."
    },
    {
      title: "Virtual Tours & 360° Photography",
      description: "Immersive digital experiences to showcase properties online."
    },
    {
      title: "Real Estate CRM Setup",
      description: "Lead management, follow-up automation, and deal tracking."
    },
    {
      title: "AI Chatbots & Virtual Assistants",
      description: "Instant responses to property inquiries 24/7."
    },
    {
      title: "Property ROI Calculators",
      description: "Interactive tools for buyers and investors to evaluate returns."
    },
    {
      title: "3D Rendering & Visualization",
      description: "Architectural renders and digital floor plans for marketing."
    },
    {
      title: "Analytics & Dashboards",
      description: "Insights on property inquiries, ad performance, and buyer trends."
    },
    {
      title: "Blockchain & Smart Contracts",
      description: "Secure, transparent property transactions using blockchain."
    },
    {
      title: "AI-Powered Lead Scoring",
      description: "Identify and prioritize serious property buyers with AI."
    },
  ];

  return (
    <section className="w-full py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Heading */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Digital Services for Real Estate
          </h2>
          <p className="mt-4 text-lg leading-8 text-gray-600">
            Empower your real estate business with modern digital solutions — from marketing to automation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, idx) => (
            <Card
              key={idx}
              className="rounded-2xl shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm leading-6">
                  {service.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
