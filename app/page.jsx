// app/page.jsx
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";      // always fetch fresh
export const revalidate = 0;

export default async function Home({ searchParams }) {
  const q = (searchParams?.q || "").trim();
  const district = (searchParams?.district || "").trim();

  // Base query
  let qb = supabase
    .from("jobs")
    .select(
      "id,title,company,location,employment_type,salary_min,salary_max,created_at",
    )
    .order("created_at", { ascending: false })
    .limit(50);

  // Free-text search across a few columns
  if (q) {
    qb = qb.or(
      `title.ilike.%${q}%,company.ilike.%${q}%,location.ilike.%${q}%`,
    );
  }

  // Optional district/location filter (AND)
  if (district) {
    qb = qb.ilike("location", `%${district}%`);
  }

  const { data: jobs, error } = await qb;

  if (error) {
    return (
      <main className="max-w-4xl mx-auto p-4">
        <div className="card p-4 text-red-400">
          Failed to load jobs: {error.message}
        </div>
      </main>
    );
  }

  return (
    <main className="max-w-5xl mx-auto px-4 pb-16">
      {/* Hero / Search */}
      <section className="card">
        <h2 className="text-xl font-semibold">Latest jobs</h2>
        <p className="text-sm text-white/60">
          Live from Supabase. Use search or filter by district.
        </p>

        <form className="mt-4 grid gap-3 md:grid-cols-3">
          <input
            className="input md:col-span-2"
            name="q"
            placeholder="Search title / company / location"
            defaultValue={q}
          />
          <input
            className="input"
            name="district"
            placeholder="District (optional)"
            defaultValue={district}
          />
          <button className="btn md:col-span-3" type="submit">
            Search
          </button>
        </form>
      </section>

      {/* Results */}
      <section className="mt-6 grid gap-4">
        {jobs?.length ? (
          jobs.map((job) => (
            <article key={job.id} className="card">
              <div className="flex items-start justify-between gap-3">
                <h3 className="text-base font-semibold">{job.title}</h3>
                <span className="text-[11px] text-white/50">
                  {new Date(job.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="mt-1 text-sm text-white/70">
                {job.company} — {job.location}
              </div>
              <div className="mt-2 text-xs text-white/60">
                {job.employment_type ? job.employment_type : "—"}
                {job.salary_min && job.salary_max
                  ? ` · ₹${job.salary_min}–₹${job.salary_max}`
                  : ""}
              </div>
            </article>
          ))
        ) : (
          <div className="card text-sm text-white/60">
            No jobs match your filters yet.
          </div>
        )}
      </section>
    </main>
  );
}
