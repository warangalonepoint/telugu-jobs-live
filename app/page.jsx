"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DISTRICTS } from "@/data/districts";
import { buildSiteLinks } from "@/lib/sites";

export default function HomePage() {
  const [district, setDistrict] = useState("Warangal");
  const [q, setQ] = useState("");

  const links = useMemo(() => buildSiteLinks({ district, q }), [district, q]);
  const quick = [
    "Accountant",
    "Driver",
    "Teacher",
    "Sales",
    "Receptionist",
    "Nurse",
    "Software",
    "Data Entry",
    "Security"
  ];

  const goSeo = () => {
    const kw = (q || "jobs").trim().replace(/\s+/g, "-").toLowerCase();
    const dist = district.trim().replace(/\s+/g, "-").toLowerCase();
    window.location.href = `/jobs/${dist}/${kw}`;
  };

  return (
    <main className="pb-16">
      {/* Banner */}
      <div className="relative w-full h-48 md:h-64 lg:h-80 rounded-2xl overflow-hidden">
        <Image
          src="/hero.jpg"
          alt="Telugu Jobs Banner"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-2xl md:text-4xl font-bold text-white drop-shadow">
            Telugu Jobs – AP & Telangana
          </h1>
        </div>
      </div>

      {/* Search Card */}
      <section className="card mt-6">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Find jobs fast</h2>
            <p className="text-sm text-white/60">
              District-filtered deep links. No scraping. No bs.
            </p>
          </div>
          <Link href="https://www.warangalonestop.in" target="_blank" className="btn">
            WarangalOneStop.in
          </Link>
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
                <option key={d} value={d}>
                  {d}
                </option>
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
                onKeyDown={(e) => e.key === "Enter" && goSeo()}
              />
              <button className="btn" onClick={goSeo}>
                Search
              </button>
            </div>
            <p className="mt-2 text-xs text-white/50">
              Tip: leave blank to browse all district jobs per site.
            </p>
          </div>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {quick.map((k) => (
            <button key={k} className="btn text-xs" onClick={() => setQ(k)}>
              {k}
            </button>
          ))}
        </div>
      </section>

      {/* Cards */}
      <section className="mt-6">
        <h3 className="mb-3 text-base font-semibold">Open on top sites</h3>
        <div className="site-grid">
          {links.map((s) => (
            <a
              key={s.name}
              href={s.url}
              target="_blank"
              rel="noreferrer"
              className="card hover:scale-[1.01] transition"
              title={`Open ${s.name}`}
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{s.name}</div>
                <span className="text-[10px] text-white/50">↗</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{s.caption}</p>
              <div className="mt-3 text-xs text-white/40 break-all">{s.pretty}</div>
            </a>
          ))}
        </div>
      </section>

      {/* Quick SEO links */}
      <section className="mt-10 card">
        <h4 className="text-sm font-semibold">Popular quick routes</h4>
        <div className="mt-3 flex flex-wrap gap-2">
          {quick.slice(0, 6).map((k) => {
            const kw = k.toLowerCase().replace(/\s+/g, "-");
            const dist = district.toLowerCase().replace(/\s+/g, "-");
            return (
              <Link
                key={k}
                href={`/jobs/${dist}/${kw}`}
                className="btn text-xs"
              >
                {district} • {k}
              </Link>
            );
          })}
        </div>
      </section>
    </main>
  );
}
