"use client";

import { useMemo, useState } from "react";
import Hero from "@/components/hero";
import SearchBar from "@/components/SearchBar";
import DistrictGrids from "@/components/districtgrids";
import { DISTRICTS } from "@/data/districts";
import { buildSiteLinks } from "@/lib/sites";

export default function HomePage() {
  const [district, setDistrict] = useState("Warangal");
  const [keyword, setKeyword] = useState("");

  const links = useMemo(
    () => buildSiteLinks({ district, q: keyword }),
    [district, keyword]
  );

  // adapt link objects to the JobCard shape (description/type fields)
  const sitesForCards = useMemo(
    () =>
      links.map((s) => ({
        name: s.name,
        url: s.url,
        description: s.caption, // map caption -> description for JobCard
        type: "External",       // static label
      })),
    [links]
  );

  const onSearch = ({ district: d, keyword: k }) => {
    if (d) setDistrict(d);
    setKeyword(k || "");
    // if you want SEO routes too, uncomment:
    // const dist = (d || district).toLowerCase().replace(/\s+/g, "-");
    // const kw = (k || "jobs").toLowerCase().replace(/\s+/g, "-");
    // window.location.href = `/jobs/${dist}/${kw}`;
  };

  return (
    <main className="pb-16">
      <Hero />

      <section className="card mt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Find jobs fast</h2>
            <p className="text-sm text-white/60">
              District-filtered deep links to Naukri, Indeed, LinkedIn, Google Jobs, OLX, Freshersworld & Apna.
            </p>
          </div>
          <a href="/post-job" className="btn">Post a Job</a>
        </div>

        <div className="mt-4">
          <SearchBar
            districts={DISTRICTS}
            onSearch={onSearch}
          />
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-base font-semibold">Open on top sites</h3>
        <DistrictGrids sites={sitesForCards} />
      </section>
    </main>
  );
}
