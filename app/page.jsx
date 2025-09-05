"use client";

import { useMemo, useState } from "react";
import { Globe, Search } from "lucide-react";
import { DISTRICTS } from "@/data/districts";
import { buildSiteLinks } from "@/lib/sites";

export default function Page() {
  const [district, setDistrict] = useState("Warangal");
  const [q, setQ] = useState("");
  const links = useMemo(() => buildSiteLinks({ district, q }), [district, q]);

  return (
    <main className="max-w-6xl mx-auto px-4 pb-16">
      <section className="card">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Find jobs fast</h2>
            <p className="text-sm text-white/60">
              District-filtered deep links across top portals. No scraping. No bs.
            </p>
          </div>
          <a
            href="https://www.warangalonestop.in"
            target="_blank"
            className="btn"
          >
            <Globe className="mr-2 h-4 w-4" />
            WarangalOneStop.in
          </a>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="text-xs text-white/60">District</label>
            <select
              className="input mt-2"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
            >
              {DISTRICTS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="text-xs text-white/60">Keyword (optional)</label>
            <div className="mt-2 flex gap-2">
              <input
                className="input"
                placeholder="e.g., accountant, driver, teacher"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
              <button className="btn">
                <Search className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-xs text-white/50">
              Tip: leave blank to browse all district jobs per portal.
            </p>
          </div>
        </div>
      </section>

      <section className="mt-6">
        <h3 className="mb-3 text-base font-semibold">Open on top sites</h3>
        <div className="site-grid">
          {links.map((site) => (
            <a
              key={site.name}
              className="card hover:scale-[1.01] transition"
              href={site.url}
              target="_blank"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">{site.name}</div>
                <span className="text-[10px] text-white/50">{site.regionLabel}</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{site.caption}</p>
              <div className="mt-3 text-xs text-white/40 break-all">{site.pretty}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 card">
        <h4 className="text-sm font-semibold">Quick buckets</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {["Accountant","Driver","Teacher","Receptionist","Sales","Nurse","Software"].map(k => (
            <button
              key={k}
              onClick={() => setQ(k)}
              className="btn text-xs"
              title={`Search ${k}`}
            >
              {k}
            </button>
          ))}
        </div>
      </section>
    </main>
  );
}
