"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { FaYoutube, FaInstagram, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/bae", label: "Book Our Expert" },
    { href: "/blog", label: "Blogs" },
    { href: "/contact", label: "Contact" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`sticky top-0 z-50 shadow-md animate-fadeInBounce transition-all duration-300 ${
        isScrolled
          ? "bg-white/90 backdrop-blur-md"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex w-full justify-between items-center">
          {/* Logo Only */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="PropMatics Logo"
              width={250}
              height={80}
              priority
            />
          </Link>
         
          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6 mt-4 md:mt-0">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`relative font-medium transition-colors duration-300 group
                  ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
              >
                {item.label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-gradient-to-r from-blue-600 to-purple-500 
                  transition-all duration-300 
                  ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
                ></span>
              </Link>
            );
          })}
        </div>

         {/* Social Icons */}
          <div className="hidden md:flex space-x-4">
            <a href="https://www.youtube.com/@propmatics" target="_blank" rel="noopener noreferrer">
              <FaYoutube className="text-red-600 hover:scale-110 transition-transform" size={22} />
            </a>
            <a href="https://www.instagram.com/propmatics/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="text-pink-500 hover:scale-110 transition-transform" size={22} />
            </a>
            <a href="https://www.facebook.com/profile.php?id=100063560241775" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="text-blue-600 hover:scale-110 transition-transform" size={22} />
            </a>
            <a href="https://www.linkedin.com/in/proptyme-property-management-services-50a612184/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="text-blue-700 hover:scale-110 transition-transform" size={22} />
            </a>
                {/* Wishlink */}
            <a href="https://www.wishlink.com/propmatics" target="_blank" rel="noopener noreferrer">
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

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white/90 backdrop-blur-sm shadow-md animate-fadeInBounce">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`font-medium transition-colors ${
                    isActive
                      ? "text-purple-600"
                      : "text-gray-700 hover:text-purple-600"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
}
