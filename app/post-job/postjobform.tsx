"use client";

import { useState } from "react";

export default function PostJobForm() {
  const [ok, setOk] = useState(false);

  return (
    <main className="max-w-2xl mx-auto px-4 pb-16">
      <section className="card mt-6">
        <h1 className="text-xl font-semibold">Post a Job</h1>
        <p className="text-sm text-white/60">
          MVP form (demo only). We’ll connect to Supabase later.
        </p>

        <form
          className="mt-6 grid gap-3"
          onSubmit={(e) => {
            e.preventDefault();
            setOk(true);
          }}
        >
          <input className="input" placeholder="Company" required />
          <input className="input" placeholder="Role (e.g., Accountant)" required />
          <input className="input" placeholder="District (e.g., Warangal)" required />
          <textarea className="input" placeholder="Short description" rows={4} />
          <button className="btn" type="submit">Submit</button>
        </form>

        {ok && (
          <p className="mt-3 text-sm text-emerald-400">
            ✅ Submitted (demo). We’ll hook this up properly next.
          </p>
        )}
      </section>
    </main>
  );
}
