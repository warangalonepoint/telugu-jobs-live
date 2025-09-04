// app/page.jsx
import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import { supabaseServer } from "../lib/supabase";
import DistrictGrid from "../components/DistrictGrid";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const s = Object.fromEntries(Object.entries(searchParams || {}).filter(Boolean));

  const supabase = supabaseServer();

  // Base query
  let query = supabase
    .from("public_jobs")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(50);

  // Filters
  if (s.q) {
    const q = `%${s.q}%`;
    query = query.or(`title.ilike.${q},company.ilike.${q},location.ilike.${q},district.ilike.${q},category.ilike.${q}`);
  }
  if (s.district) query = query.ilike("district", `%${s.district}%`);
  if (s.category) query = query.ilike("category", `%${s.category}%`);

  const { data: jobs, error } = await query;

  // For district cards we only need district names; count in JS (cheap for 50 rows)
  const { data: districtsRaw } = await supabase
    .from("public_jobs")
    .select("district")
    .limit(500);

  const districtCounts = (() => {
    const map = new Map();
    (districtsRaw || []).forEach((r) => {
      const key = (r.district || "Unknown").trim();
      map.set(key, (map.get(key) || 0) + 1);
    });
    return Array.from(map.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12); // top 12 districts
  })();

  return (
    <>
      <Hero />
      <section className="container">
        <SearchBar />
      </section>

      {/* District cards */}
      <section className="container section-spacing">
        <h2 className="section-title">Jobs by District</h2>
        <DistrictGrid items={districtCounts} />
      </section>

      {/* Results */}
      <section className="container section-spacing">
        <h2 className="section-title">
          {error ? "Couldn’t load jobs" : `Latest Jobs (${jobs?.length || 0})`}
        </h2>

        {!jobs?.length ? (
          <p className="muted">No jobs yet. Add a row to <code>public_jobs</code> in Supabase.</p>
        ) : (
          <ul className="job-list">
            {jobs.map((j) => (
              <li key={j.id} className="job-card">
                <a href={`/jobs/${j.id}`} className="job-title">{j.title}</a>
                <div className="job-meta">
                  <span>{j.company || "—"}</span>
                  <span>•</span>
                  <span>{j.location || j.district || j.state || "Location"}</span>
                  {j.job_type ? (
                    <>
                      <span>•</span>
                      <span className="badge">{j.job_type.replace("_", " ")}</span>
                    </>
                  ) : null}
                </div>
                {j.description ? (
                  <p className="job-desc">{String(j.description).slice(0, 180)}{String(j.description).length > 180 ? "…" : ""}</p>
                ) : null}
                <div className="job-actions">
                  <a className="btn" href={`/jobs/${j.id}`}>View Details</a>
                  {j.external_url ? (
                    <a className="btn btn-ghost" href={j.external_url} target="_blank" rel="noreferrer">
                      Apply
                    </a>
                  ) : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  );
}
