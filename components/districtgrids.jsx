"use client";
import Link from "next/link";

export default function DistrictGrid({ rows }) {
  if (!rows?.length) return null;

  return (
    <section className="mt-10">
      <h2 className="mb-4 text-xl font-semibold">Jobs by District</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {rows.map((r) => (
          <Link
            key={r.district || "unknown"}
            href={`/?district=${encodeURIComponent(r.district || "")}`}
            className="card hover:shadow-md transition"
          >
            <div className="card-body">
              <div className="text-sm text-gray-500">District</div>
              <div className="mt-1 text-lg font-semibold">{r.district || "Unspecified"}</div>
              <div className="mt-2 text-brand-600 font-bold">{r.count} Jobs</div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
