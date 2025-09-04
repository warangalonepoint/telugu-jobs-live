// components/DistrictGrid.jsx
import Link from "next/link";

export default function DistrictGrid({ items = [] }) {
  const data = items
    .filter(i => i.district)
    .map(i => ({ district: i.district, count: Number(i.count || 0) }))
    .sort((a, b) => b.count - a.count);

  if (!data.length) return <p className="muted">No jobs yet. Add some in Supabase to see district cards.</p>;

  return (
    <div className="grid">
      {data.map(({ district, count }) => (
        <Link key={district} href={`/jobs?district=${encodeURIComponent(district)}`} className="card">
          <div className="card-top">
            <span className="badge">{count}</span>
          </div>
          <div className="card-title">{district}</div>
          <div className="card-sub">openings</div>
        </Link>
      ))}
    </div>
  );
}
