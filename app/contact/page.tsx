import ContactForm from '../../components/ContactForm';

export default function Home() {
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
{/* Top-right link */}
        <div className="flex justify-end mb-6">
          <h2>Looking for any specific need??</h2>
       <Link
              href="/pages/book-an-expert"
              className="px-6 py-3 rounded-xl shadow-lg font-semibold text-white 
                         bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                         hover:opacity-90 transition text-center sm:text-left"
            >
              Book Our Expert
            </Link>
        </div>
        
        <h1
          className="text-3xl sm:text-4xl font-bold text-center mb-8 
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          bg-clip-text text-transparent animate-gradientWave"
        >
          Contact Us
        </h1>

        <ContactForm />
      </div>
    </main>
  );
}
