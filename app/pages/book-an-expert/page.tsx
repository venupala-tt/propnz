import ContactForm from "../../../components/boe-ContactForm";

export default function BookAnExpertPage() {
  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center 
      p-6 sm:p-12 lg:p-24 
      bg-gradient-to-br from-blue-100 via-white to-purple-100 
      animate-gradientWave"
    >
      <div
        className="w-full max-w-4xl rounded-2xl shadow-lg 
        bg-white/80 backdrop-blur-sm p-8 sm:p-12 
        animate-fadeInBounce"
      >
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-6 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Book an Expert
        </h1>

        <p className="text-gray-600 mb-8 text-center">
          Schedule a consultation with our experts. Provide details about your
          requirements and we will connect you with the right professional.
        </p>

        {/* Contact Form */}
        <div className="space-y-6">
          <ContactForm />

          {/* Gradient Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              form="contact-form" // ✅ ensure your ContactForm uses id="contact-form"
              className="px-8 py-3 rounded-xl shadow-lg font-semibold text-white 
                bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                hover:opacity-90 transition-all duration-300"
            >
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
