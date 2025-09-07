"use client";
import { useState } from "react";

export default function BookAnExpertPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/boecontact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to submit");

      setSubmitted(true);
      setFormData({ name: "", email: "", category: "", message: "" });
    } catch (error) {
      console.error("❌ Submission error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

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

        {/* 📌 Quick Info Section */}
        <div className="mb-10 text-center">
          <h2 className="text-xl font-semibold text-purple-700 mb-3">
            Why Book Our Expert?
          </h2>
          <ul className="text-gray-700 list-disc list-inside space-y-2">
            <li>✔ Get personalized guidance tailored to your needs</li>
            <li>✔ Save time with professional expertise</li>
            <li>✔ Trusted advice on property, documentation, and planning</li>
          </ul>
        </div>

        {/* Contact Form */}
        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            {/* 📌 Category Select */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            >
              <option value="">Select Category</option>
              <option>Property Advisory</option>
              <option>Construction Planning Services</option>
              <option>Interior Designing</option>
              <option>Vaastu Services</option>
              <option>Property Documentation Services</option>
              <option>Flat-Ready-Services</option>
            </select>

            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-purple-400 outline-none"
              required
            />

            {/* Gradient Submit Button */}
            <button
              type="submit"
              className="w-full px-8 py-3 rounded-xl shadow-lg font-semibold text-white 
                bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
                hover:opacity-90 transition-all duration-300"
            >
              Submit Request
            </button>
          </form>
        ) : (
          <div className="text-center text-green-600 font-semibold">
            ✅ Thank you! Your request has been submitted.
          </div>
        )}
      </div>
    </main>
  );
}
