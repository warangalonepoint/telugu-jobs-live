"use client";
import { useState, useMemo } from "react";

const SITES = [
  { name: "Google Jobs", tag: "IN", build: (d, q) => `https://www.google.com/search?q=${encodeURIComponent((q? q+' ' : '') + d + " jobs")}` },
  { name: "LinkedIn", tag: "IN", build: (d, q) => `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(q || "jobs")}&location=${encodeURIComponent(d + ", India")}` },
  { name: "Naukri", tag: "IN", build: (d, q) => `https://www.naukri.com/${encodeURIComponent((q||"jobs")+"-in-"+d)}` },
  { name: "Indeed", tag: "IN", build: (d, q) => `https://in.indeed.com/jobs?q=${encodeURIComponent(q||"")}&l=${encodeURIComponent(d)}` },
  { name: "OLX (Jobs)", tag: "Local", build: (d, q) => `https://www.olx.in/jobs_c3?q=${encodeURIComponent(q||"")}&filter_enum_state[]=telangana&search[description]=${encodeURIComponent(d)}` },
  { name: "Freshersworld", tag: "IN", build: (d, q) => `https://www.freshersworld.com/jobs-in-${encodeURIComponent(d)}` },
  { name: "Apna", tag: "Local", build: (d, q) => `https://apna.co/jobs/search?query=${encodeURIComponent(q||"")}&location=${encodeURIComponent(d)}` },
];

const DISTRICTS = [
  "Warangal","Karimnagar","Khammam","Nizamabad","Adilabad","Medak","Mahbubnagar",
  "Nalgonda","Rangareddy","Hyderabad","Visakhapatnam","Vijayawada","Guntur","Tirupati","Kurnool","Anantapur","Amaravati","Kadapa","Nellore"
];

export default function Launcher() {
  const [district, setDistrict] = useState("Warangal");
  const [q, setQ] = useState("");

  const links = useMemo(() => SITES.map(s => ({
    ...s,
    href: s.build(district, q)
  })), [district, q]);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Find jobs fast</h1>
        <a href="/jobs" className="text-sm underline">View Posted Jobs →</a>
      </header>

      <section className="card p-4">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="md:col-span-1">
            <label className="text-sm block mb-1">District</label>
            <select className="input w-full" value={district} onChange={e=>setDistrict(e.target.value)}>
              {DISTRICTS.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="md:col-span-2">
            <label className="text-sm block mb-1">Keyword (optional)</label>
            <input className="input w-full" placeholder="e.g., accountant, driver, teacher" value={q} onChange={e=>setQ(e.target.value)} />
          </div>
        </div>
        <p className="mt-2 text-xs text-white/60">Tip: leave keyword empty to browse all jobs for that district per site.</p>
      </section>

      <section className="mt-6 grid gap-4 md:grid-cols-3">
        {links.map(s => (
          <a key={s.name} href={s.href} target="_blank" rel="noreferrer" className="card hover:opacity-90">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{s.name}</h3>
              <span className="text-[10px] text-white/60">{s.tag}</span>
            </div>
            <p className="text-xs mt-1 break-all">{s.href}</p>
          </a>
        ))}
      </section>
    </main>
  );
}
