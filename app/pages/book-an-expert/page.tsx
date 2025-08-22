import ContactForm from "../components/boe-ContactForm";

export default function BookAnExpertPage() {
  return (
    <section className="px-6 py-12 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Book an Expert</h1>
      <p className="text-gray-600 mb-6">
        Schedule a consultation with our experts. Provide details about your
        requirements and we will connect you with the right professional.
      </p>

      {/* Contact Form */}
      <ContactForm />
    </section>
  );
}
