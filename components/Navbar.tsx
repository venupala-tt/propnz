"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/roi", label: "Tools" },
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
      <div className="container mx-auto flex justify-between items-center p-4">
        {/* Logo Only */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo.png" // Place your generated logo file in /public/logo.png
            alt="PropMatics Logo"
            width={250}
            height={80}
            priority
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-6">
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

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
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
