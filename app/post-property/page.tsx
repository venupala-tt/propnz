"use client";
import { useState } from "react";
import Image from "next/image";

export default function PostPropertyPage() {
  const [form, setForm] = useState({
    title: "",
    price: "",
    location: "",
    description: "",
  });
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length + images.length > 10) {
      alert("You can upload a maximum of 10 images.");
      return;
    }
    setImages((prev) => [...prev, ...files]);
    setPreviews((prev) => [...prev, ...files.map((file) => URL.createObjectURL(file))]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // 1?? Upload images to server or Cloudinary
    const imageUrls: string[] = [];
    for (const img of images) {
      const formData = new FormData();
      formData.append("file", img);
      const uploadRes = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await uploadRes.json();
      imageUrls.push(data.url);
    }

    // 2?? Submit property data with image URLs
    const res = await fetch("/api/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, images: imageUrls }),
    });

    if (res.ok) {
      setMessage("Property posted successfully!");
      setForm({ title: "", price: "", location: "", description: "" });
      setImages([]);
      setPreviews([]);
    } else {
      setMessage("Failed to post property.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-4">Post a Property</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Title"
          className="border p-2 rounded"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
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
        <input
          type="number"
          placeholder="Price"
          className="border p-2 rounded"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          className="border p-2 rounded"
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={4}
        />

        {/* Image Upload */}
        <label className="font-semibold">Upload up to 10 images:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="border p-2 rounded"
        />
        <div className="grid grid-cols-3 gap-2 mt-2">
          {previews.map((src, i) => (
            <Image key={i} src={src} alt={`preview-${i}`} width={100} height={100} className="rounded" />
          ))}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? "Posting..." : "Submit Property"}
        </button>
      </form>

      {message && <p className="mt-3 text-green-600">{message}</p>}
    </div>
  );
}
