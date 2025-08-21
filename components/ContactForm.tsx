'use client';
import { useState } from 'react';

export default function ContactForm() {
  const [status, setStatus] = useState<'success' | 'error' | ''>('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('');
    setLoading(true);

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.get('name'),
        email: formData.get('email'),
        message: formData.get('message'),
      }),
    });

    setLoading(false);

    if (res.ok) {
      setStatus('success');
      form.reset();
      setTimeout(() => setStatus(''), 4000);
    } else {
      setStatus('error');
    }
  };

  return (
    <div className="relative">
      {/* Toast Notification */}
      {status && (
        <div
          className={`absolute -top-14 left-1/2 -translate-x-1/2 px-6 py-3 rounded-lg shadow-lg text-white font-semibold animate-fadeInBounce transition-all duration-500
          ${status === 'success' ? 'bg-green-500' : 'bg-red-500'}`}
        >
          {status === 'success'
            ? '✅ Form submitted successfully!'
            : '❌ Failed to send message. Please try again.'}
        </div>
      )}

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

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white flex items-center justify-center
          bg-gradient-to-r from-blue-600 via-purple-500 to-pink-500 
          hover:from-blue-700 hover:via-purple-600 hover:to-pink-600 
          transition-all duration-300 animate-fadeInBounce disabled:opacity-70`}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            'Send Message'
          )}
        </button>
      </form>
    </div>
  );
}
