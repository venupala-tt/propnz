"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const { data: session } = useSession();

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const navLinks = [
    { href: "/properties", label: "Properties" },
    { href: "/services", label: "Services" },
    { href: "/products", label: "Products" },
    { href: "/pages/tools", label: "Prop Tools" },
    { href: "/blog", label: "Blogs" },
    { href: "/pages/book-an-expert", label: "Book Expert" },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await signIn("credentials", {
      redirect: false,
      email: form.email,
      password: form.password,
    });

    if (res?.ok) {
      setShowLogin(false);
      router.push("/dashboard"); // ✅ always redirect here
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <nav
      className={`sticky top-0 z-50 shadow-md transition-all duration-300 ${
        isScrolled ? "bg-white/90 backdrop-blur-md" : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        <div className="flex w-full justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo-new.jpg"
              alt="PropMatics Logo"
              width={250}
              height={80}
              priority
            />
          </Link>

          {/* Desktop Nav + Auth */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative font-medium transition-colors duration-300 group ${
                    isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
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

            {/* Auth Section (Desktop) */}
            {!session ? (
              <button
                onClick={() => setShowLogin(true)}
                className="ml-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Sign In
              </button>
            ) : (
              <div className="flex items-center gap-3 ml-6">
                <span className="text-gray-700">Hi, {session.user?.email}</span>
                <button
                  onClick={() => signOut()}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-3">
          {navLinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block font-medium ${
                  isActive ? "text-purple-600" : "text-gray-700 hover:text-purple-600"
                }`}
              >
                {item.label}
              </Link>
            );
          })}

          {/* Auth Section (Mobile) */}
          {!session ? (
            <button
              onClick={() => {
                setShowLogin(true);
                setIsOpen(false);
              }}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Sign In
            </button>
          ) : (
            <div className="flex flex-col gap-2">
              <span className="text-gray-700">Hi, {session.user?.email}</span>
              <button
                onClick={() => signOut()}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            </div>
          )}
        </div>
      )}

      {/* Login Modal */}
      {showLogin && !session && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md relative">
            <button
              onClick={() => setShowLogin(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-800"
            >
              <X size={20} />
            </button>

            <h2 className="text-xl font-bold mb-4 text-center">Sign In</h2>
            <form onSubmit={handleLogin} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
              {error && <p className="text-red-500 text-sm">{error}</p>}
              <button
                type="submit"
                className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>

            <p className="text-center text-sm mt-4">
              New here?{" "}
              <Link href="/register" className="text-green-600 underline">
                Register
              </Link>
            </p>
          </div>
        </div>
      )}
    </nav>
  );
}
