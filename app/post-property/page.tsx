"use client";
import { useState } from "react";

export default function PostPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
    name: "",
    phone: "",
    email: "",
    userType: "",
    additionalInfo: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle image upload (max 10)
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setPreviews((prev) => [...prev, ...newPreviews]);
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const formData = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        formData.append(key, value);
      });
      images.forEach((file) => formData.append("images", file));

      // Send to API route which emails info@propmatics.com
      const res = await fetch("/api/properties", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Property submitted successfully! Email sent to info@propmatics.com.");
        setForm({
          title: "",
          price: "",
          location: "",
          description: "",
          name: "",
          phone: "",
          email: "",
          userType: "",
          additionalInfo: "",
        });
        setImages([]);
        setPreviews([]);
      } else {
        setMessage(`❌ Error: ${data.error || "Failed to send property details."}`);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Something went wrong while submitting the form.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h1 className="text-2xl font-bold mb-4 text-center">Post a Property</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Your Name"
          className="border p-2 rounded"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          className="border p-2 rounded"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          required
        />

        <input
          type="email"
          placeholder="Email ID"
          className="border p-2 rounded"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />

        <select
          className="border p-2 rounded"
          value={form.userType}
          onChange={(e) => setForm({ ...form, userType: e.target.value })}
          required
        >
          <option value="">Are you a Seller / Agent / Buyer?</option>
          <option value="Seller">Seller</option>
          <option value="Agent">Agent</option>
          <option value="Buyer">Buyer</option>
        </select>

        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="border p-2 rounded"
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          required
        />

        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          rows={4}
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <textarea
          placeholder="Additional Information (if any)"
          className="border p-2 rounded"
          rows={3}
          value={form.additionalInfo}
          onChange={(e) => setForm({ ...form, additionalInfo: e.target.value })}
        />

        <label className="font-semibold mt-2">Upload Max 10 images</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="border p-2 rounded"
        />

        {previews.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mt-2">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`preview-${i}`}
                className="w-full h-24 object-cover rounded"
              />
            ))}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50 mt-4"
        >
          {loading ? "Submitting..." : "Submit Property"}
        </button>
      </form>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
