"use client";

import { useState, useEffect } from "react";

interface Property {
  id: string;
  title: string;
  description: string;
  location: string;
}

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Property[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
        const data = await res.json();
        setResults(data);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [query]);

  return (
    <div className="w-full max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search properties..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="mt-4">
        {loading && <p className="text-gray-500">Searching...</p>}
        {!loading && results.length === 0 && query.length > 2 && (
          <p className="text-gray-500">No results found.</p>
        )}

        <ul className="space-y-2">
          {results.map((item) => (
            <li
              key={item.id}
              className="p-4 bg-white rounded-xl shadow hover:shadow-md transition"
            >
              <h3 className="text-lg font-semibold">{item.title}</h3>
              <p className="text-gray-600 text-sm">{item.description}</p>
              <span className="text-xs text-gray-400">{item.location}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
