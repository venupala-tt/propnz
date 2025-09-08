import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin, FaMapMarkerAlt, FaEnvelope } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Logo + Tagline */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <Link href="/" className="inline-block transform transition-transform duration-300 hover:scale-105">
            <Image
              src="/logo.png" // make sure your logo is inside /public
              alt="PropMatics Logo"
              width={150}
              height={50}
              className="object-contain"
            />
          </Link>
          <p className="text-gray-700 text-sm md:text-base max-w-xs">
            Learn & Build scalable, Property Solutions.
          </p>
        </div>

        {/* Useful Links Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/pages/cancellation-refund-policy" className="text-gray-600 hover:text-blue-600 transition">
                Cancellation-Refund-Policy
              </Link>
            </li>
            <li>
              <Link href="/pages/pricing" className="text-gray-600 hover:text-blue-600 transition">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/pages/privacy-policy" className="text-gray-600 hover:text-blue-600 transition">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/pages/shipping-policy" className="text-gray-600 hover:text-blue-600 transition">
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link href="/pages/terms-conditions" className="text-gray-600 hover:text-blue-600 transition">
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact Us Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Contact Us</h2>
          <ul className="space-y-3 text-gray-600">
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaMapMarkerAlt className="text-blue-600" />
              <span>Hyderabad, Telangana, India</span>
            </li>
            <li className="flex items-center justify-center md:justify-start gap-2">
              <FaEnvelope className="text-blue-600" />
              <a href="mailto:info@propmatics.com" className="hover:text-blue-600">
                info@propmatics.com
              </a>
            </li>
            <li>
              <Link href="/pages/contact" className="text-blue-600 font-medium hover:underline">
                Contact Us Page
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links + Map */}
        <div className="flex flex-col items-center md:items-start space-y-6">
          {/* Social Links */}
          <div className="flex justify-center md:justify-start space-x-6">
            <a href="https://www.youtube.com/@propmatics" target="_blank" rel="noopener noreferrer" title="YouTube">
              <FaYoutube size={24} className="text-red-600 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.instagram.com/propmatics/" target="_blank" rel="noopener noreferrer" title="Instagram">
              <FaInstagram size={24} className="text-pink-500 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063560241775" target="_blank" rel="noopener noreferrer" title="Facebook">
              <FaFacebook size={24} className="text-blue-600 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.linkedin.com/in/proptyme-property-management-services-50a612184/" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FaLinkedin size={24} className="text-blue-700 hover:scale-110 transition-transform" />
            </a>
            <a href="https://www.wishlink.com/propmatics" target="_blank" rel="noopener noreferrer" title="Wishlink">
              <img src="/wishlink-favicon.ico" alt="Wishlink" width={24} height={24} className="rounded hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Google Map Embed */}
          <div className="w-full h-40 md:h-48 lg:h-56">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.406893731863!2d78.48667151516434!3d17.38504458807578!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99f5a58c0a6d%3A0xb1ed2cfa53a58e61!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1694000000000!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Copyright at Bottom */}
      <div className="mt-10 border-t border-gray-300 pt-4">
        <p className="text-sm text-gray-600 text-center">
          © {new Date().getFullYear()} PropMatics by Tech Talents
        </p>
      </div>
    </footer>
  );
}
