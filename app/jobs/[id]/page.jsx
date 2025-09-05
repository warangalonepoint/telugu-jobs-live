"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, company, location")
        .order("id", { ascending: false })
        .limit(50);
      if (error) setError(error.message);
      else setJobs(data || []);
      setLoading(false);
    })();
  }, []);

  if (loading) return <div className="p-4">Loading jobs…</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Latest Jobs</h1>
      <ul className="space-y-4">
        {jobs.map((j) => (
          <li key={j.id} className="border p-4 rounded">
            <h2 className="text-lg font-semibold">{j.title}</h2>
            <p className="text-gray-600">{j.company}</p>
            <p className="text-gray-500">{j.location}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
