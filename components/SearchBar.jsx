// components/SearchBox.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";

export default function SearchBox({ locations = [], categories = [], initial = {} }) {
  const r = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(initial.q || "");
  const [district, setDistrict] = useState(initial.district || "");
  const [category, setCategory] = useState(initial.category || "");

  useEffect(() => {
    // Sync if URL changes elsewhere
    setQ(sp.get("q") || "");
    setDistrict(sp.get("district") || "");
    setCategory(sp.get("category") || "");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sp.toString()]);

  function submit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district) params.set("district", district);
    if (category) params.set("category", category);
    r.push(params.toString() ? `/jobs?${params}` : "/jobs");
  }

  return (
    <form className="search" onSubmit={submit}>
      <div className="search-row">
        <div className="field">
          <span className="icon">🔎</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Job title or keywords"
            aria-label="Job title or keywords"
          />
        </div>

        <div className="field">
          <span className="icon">📍</span>
          <select value={district} onChange={(e) => setDistrict(e.target.value)} aria-label="Select Location">
            <option value="">Select Location</option>
            {locations.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>

        <div className="field">
          <span className="icon">🗂️</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)} aria-label="Job Category">
            <option value="">Job Category</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="search-btn" type="submit">
        <span className="btn-icon">🔎</span> Search Jobs
      </button>
    </form>
  );
}
