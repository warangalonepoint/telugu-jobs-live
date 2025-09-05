import { createClient } from "@supabase/supabase-js";
import Link from "next/link";
import DistrictGrid from "@/components/DistrictGrid";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

async function getJobs() {
  const { data, error } = await supabase
    .from("public_jobs")
    .select("id,title,company,location,category,job_type,salary_min,salary_max,salary_currency,created_at")
    .order("created_at", { ascending: false })
    .limit(10);
  if (error) { console.error(error); return []; }
  return data ?? [];
}

async function getDistrictCounts() {
  // Works even if some rows have NULL district
  const { data, error } = await supabase
    .rpc("count_by_district"); // if you created a function; else fallback below

  if (error) {
    // Fallback query if no RPC function exists
    const { data: rows, error: err2 } = await supabase
      .from("public_jobs")
      .select("district")
      .neq("is_active", false);
    if (err2) { console.error(err2); return []; }

    // group in node (SSR)
    const map = new Map();
    rows.forEach(r => {
      const d = r.district || "";
      map.set(d, (map.get(d) || 0) + 1);
    });
    return Array.from(map, ([district, count]) => ({ district, count })).sort((a,b)=>b.count-a.count).slice(0,12);
  }
  return data;
}

export default async function HomePage() {
  const [jobs, districts] = await Promise.all([getJobs(), getDistrictCounts()]);

  return (
    <div className="space-y-8">
      {/* HERO */}
      <section className="hero">
        <div className="max-w-3xl">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight">
            Find Your Dream <br /> Job in <br /> AP &amp; Telangana
          </h1>
          <p className="mt-4 text-white/90">
            Discover thousands of job opportunities across Andhra Pradesh and Telangana. Your next
            career move starts here.
          </p>
        </div>

        {/* Search UI (static for now) */}
        <div className="mt-8 grid gap-3 rounded-2xl bg-white/10 p-4 backdrop-blur">
          <input className="input" placeholder="Job title or keywords" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <select className="select"><option>Select Location</option></select>
            <select className="select"><option>Job Category</option></select>
          </div>
          <button className="btn btn-primary">Search Jobs</button>
        </div>
      </section>

      {/* DISTRICTS */}
      <DistrictGrid rows={districts} />

      {/* LATEST JOBS */}
      <section>
        <h2 className="mb-4 text-xl font-semibold">Latest Jobs</h2>
        <div className="grid gap-4">
          {jobs.length === 0 && (
            <div className="card">
              <div className="card-body">
                <p className="text-gray-600">No jobs yet. Add a row to <code>public_jobs</code> in Supabase.</p>
              </div>
            </div>
          )}

          {jobs.map((job) => {
            const salary =
              job.salary_min && job.salary_max
                ? `${job.salary_currency || "INR"} ${job.salary_min} – ${job.salary_max}`
                : "—";
            return (
              <div key={job.id} className="card hover:shadow-md transition">
                <div className="card-body">
                  <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Link href={`/jobs/${job.id}`} className="text-lg font-semibold hover:underline">
                        {job.title}
                      </Link>
                      <div className="text-sm text-gray-600">
                        {job.company} • {job.location}
                      </div>
                    </div>
                    <div className="mt-2 flex items-center gap-2 sm:mt-0">
                      <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-medium text-orange-700">
                        {job.job_type?.replace("_", " ") || "FULL TIME"}
                      </span>
                      <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700">
                        {job.category || "General"}
                      </span>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-700">Salary: {salary}</div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
