'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'success' | 'error' | ''>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    // Simulated API call
    await new Promise((resolve) => setTimeout(resolve, 800));

    // Example: always success for now
    setStatus('success');
    form.reset();

    // Remove message after 4 seconds
    setTimeout(() => setStatus(''), 4000);
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:border-purple-500 focus:ring focus:ring-purple-200 
          outline-none transition duration-200"
        />
      </div>

      {/* Email */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:border-blue-500 focus:ring focus:ring-blue-200 
          outline-none transition duration-200"
        />
      </div>

      {/* Message */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Message
        </label>
        <textarea
          name="message"
          placeholder="Type your message..."
          rows={4}
          required
          className="w-full px-4 py-3 rounded-lg border border-gray-300 
          focus:border-pink-500 focus:ring focus:ring-pink-200 
          outline-none transition duration-200 resize-none"
        ></textarea>
      </div>

      {/* Submit */}
      <button
        type="submit"
        className="w-full py-3 rounded-lg font-semibold text-white 
        bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
        hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
        transition-all duration-300 animate-fadeInBounce"
      >
        Send Message
      </button>

      {/* Success Message */}
      {status === 'success' && (
        <p
          className="text-green-600 text-center font-semibold animate-fadeInBounce"
        >
          ✅ Form submitted successfully!
        </p>
      )}
    </form>
  );
}
