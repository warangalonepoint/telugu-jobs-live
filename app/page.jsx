"use client";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function JobsPage() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, company, location")
        .order("id", { ascending: false })
        .limit(50);

      if (error) {
        setError(error.message);
      } else {
        setJobs(data || []);
      }
      setLoading(false);
    };

    fetchJobs();
  }, []);

  if (loading) return <div className="p-4">Loading jobs…</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <main className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Latest Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="border p-4 rounded shadow-sm hover:shadow-md"
            >
              <h2 className="text-lg font-semibold">{job.title}</h2>
              <p className="text-gray-600">{job.company}</p>
              <p className="text-gray-500">{job.location}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
