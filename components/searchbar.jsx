"use client";

import { useState } from "react";

export default function SearchBar({ districts, onSearch }) {
  const [district, setDistrict] = useState("");
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ district, keyword });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row gap-3 md:items-center bg-gray-900 p-4 rounded-lg shadow"
    >
      <select
        className="p-2 rounded bg-gray-800 text-white"
        value={district}
        onChange={(e) => setDistrict(e.target.value)}
      >
        <option value="">Select District</option>
        {districts.map((d) => (
          <option key={d} value={d}>
            {d}
          </option>
        ))}
      </select>

      <input
        type="text"
        placeholder="Keyword (optional)"
        className="flex-1 p-2 rounded bg-gray-800 text-white"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />

      <button
        type="submit"
        className="px-4 py-2 rounded bg-blue-600 hover:bg-blue-500 text-white"
      >
        Search
      </button>
    </form>
  );
}
