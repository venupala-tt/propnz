import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-100 text-center py-10 mt-10">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Copyright */}
        <div className="flex flex-col justify-center items-center md:items-start">
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} PropMatics by Tech Talents
          </p>
        </div>

        {/* Useful Links Section */}
        <div className="text-center md:text-left">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">Useful Links</h2>
          <ul className="space-y-2">
            <li>
              <Link
                    { href: "/contact", label: "Contact" },
                href="/pages/contact"
                className="text-gray-600 hover:text-blue-600 transition"
              >
            Contact Us
            </Link>
            </li>
            <li>
              <Link
                href="/pages/cancellation-refund-policy"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Cancellation-Refund-Policy
              </Link>
            </li>
            <li>
              <Link
                href="/pages/pricing"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Pricing
              </Link>
            </li>
                        <li>
              <Link
                href="/pages/privacy-policy"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Privacy Policy
              </Link>
            </li>
               <li>
              <Link
                href="/pages/shipping-policy"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Shipping Policy
              </Link>
            </li>
            <li>
              <Link
                href="/pages/terms-conditions"
                className="text-gray-600 hover:text-blue-600 transition"
              >
            Terms Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6">
          {/* YouTube Animated Gradient */}
          <a
            href="https://www.youtube.com/@propmatics"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="transition-all duration-200 transform hover:scale-110 animate-fadeInBounce delay-[0ms] hover:drop-shadow-youtube"
          >
            <FaYoutube
              size={24}
              className="text-red-600 hover:text-transparent hover:bg-gradient-to-r hover:from-red-500 hover:via-orange-500 hover:to-red-700 hover:bg-clip-text hover:animate-gradientWave"
            />
          </a>

          {/* Instagram Animated Gradient */}
          <a
            href="https://www.instagram.com/propmatics/"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="transition-all duration-200 transform hover:scale-110 animate-fadeInBounce delay-[150ms] hover:drop-shadow-instagram"
          >
            <FaInstagram
              size={24}
              className="text-pink-500 hover:text-transparent hover:bg-gradient-to-tr hover:from-yellow-400 hover:via-pink-500 hover:to-purple-600 hover:bg-clip-text hover:animate-gradientWave"
            />
          </a>

          {/* Facebook Animated Gradient */}
          <a
            href="https://www.facebook.com/profile.php?id=100063560241775"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="transition-all duration-200 transform hover:scale-110 animate-fadeInBounce delay-[300ms] hover:drop-shadow-facebook"
          >
            <FaFacebook
              size={24}
              className="text-blue-600 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-600 hover:to-blue-800 hover:bg-clip-text hover:animate-gradientWave"
            />
          </a>

          {/* LinkedIn Animated Gradient */}
          <a
            href="https://www.linkedin.com/in/proptyme-property-management-services-50a612184/"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="transition-all duration-200 transform hover:scale-110 animate-fadeInBounce delay-[450ms] hover:drop-shadow-linkedin"
          >
            <FaLinkedin
              size={24}
              className="text-blue-700 hover:text-transparent hover:bg-gradient-to-r hover:from-blue-400 hover:via-blue-600 hover:to-blue-900 hover:bg-clip-text hover:animate-gradientWave"
            />
          </a>

          {/* Wishlink */}
          <a
            href="https://www.wishlink.com/propmatics"
            target="_blank"
            rel="noopener noreferrer"
            title="Wishlink"
            className="transition-all duration-200 transform hover:scale-110 animate-fadeInBounce delay-[600ms]"
          >    
            <img
              src="/wishlink-favicon.ico"  // make sure it's inside /public
              alt="Wishlink"
              width={24}
              height={24}
              className="rounded"
            />
          </a> 
        </div>
      </div>
    </footer>
  );
}
