// app/page.jsx
import Image from "next/image";
import { supabaseServer } from "../lib/supabase";
import SearchBox from "../components/SearchBox";
import DistrictGrid from "../components/DistrictGrid";

export const dynamic = "force-dynamic";

export default async function Home({ searchParams }) {
  const sp = Object.fromEntries(Object.entries(searchParams || {}).filter(([,v]) => v));

  const supabase = supabaseServer();

  // Distinct locations & categories for the dropdowns
  const [{ data: locRows }, { data: catRows }] = await Promise.all([
    supabase.from("jobs").select("district").not("district", "is", null),
    supabase.from("jobs").select("category").not("category", "is", null),
  ]);

  const locations = Array.from(
    new Set((locRows || []).map(r => (r.district || "").trim()).filter(Boolean))
  ).sort();

  const categories = Array.from(
    new Set((catRows || []).map(r => (r.category || "").trim()).filter(Boolean))
  ).sort();

  // District counts
  const { data: districtCounts } = await supabase
    .from("jobs")
    .select("district, count:id", { count: "exact", head: false })
    .neq("is_active", false)
    .not("district", "is", null)
    .group("district");

  return (
    <main className="home">
      <section className="hero">
        {/* Put your AI hero image in /public/hero.jpg (1920x1080 recommended) */}
        <Image
          src="/hero.jpg"
          alt="People working, career growth"
          fill
          priority
          className="hero-bg"
        />
        <div className="hero-overlay" />
        <div className="hero-inner">
          <div className="brand">
            <div className="brand-icon" />
            <div>
              <div className="brand-title">Telugu Jobs</div>
              <div className="brand-sub">AP & Telangana</div>
            </div>
            <a className="cta" href="/post-job">Post a Job</a>
          </div>

          <h1 className="hero-title">
            Find Your Dream<br/>Job in <span>AP & Telangana</span>
          </h1>
          <p className="hero-sub">
            Discover thousands of job opportunities across Andhra Pradesh and Telangana.
            Your next career move starts here.
          </p>

          <SearchBox locations={locations} categories={categories} initial={sp} />
        </div>
      </section>

      <section className="section">
        <div className="section-head">
          <h2>Browse jobs by district</h2>
          <p>Quickly jump to openings near you.</p>
        </div>
        <DistrictGrid items={districtCounts || []} />
      </section>
    </main>
  );
}
