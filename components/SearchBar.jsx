// components/SearchBar.jsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function SearchBar() {
  const router = useRouter();
  const sp = useSearchParams();

  const [q, setQ] = useState(sp.get("q") || "");
  const [district, setDistrict] = useState(sp.get("district") || "");
  const [category, setCategory] = useState(sp.get("category") || "");

  useEffect(() => {
    setQ(sp.get("q") || "");
    setDistrict(sp.get("district") || "");
    setCategory(sp.get("category") || "");
  }, [sp]);

  function submit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (district) params.set("district", district);
    if (category) params.set("category", category);
    router.push(`/?${params.toString()}`);
  }

  return (
    <form onSubmit={submit} className="search-card">
      <div className="row">
        <div className="field">
          <label>Job title or keywords</label>
          <input
            placeholder="e.g., React Developer"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Select Location</label>
          <input
            placeholder="District or city"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />
        </div>

        <div className="field">
          <label>Job Category</label>
          <input
            placeholder="IT, Govt, Banking…"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </div>
      </div>

      <div className="actions">
        <button className="btn" type="submit">Search Jobs</button>
      </div>
    </form>
  );
}
