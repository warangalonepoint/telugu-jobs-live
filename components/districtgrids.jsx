// components/DistrictGrid.jsx
export default function DistrictGrid({ items = [] }) {
  if (!items.length) return null;
  return (
    <div className="district-grid">
      {items.map(([name, count]) => (
        <a
          key={name}
          className="district-card"
          href={`/?district=${encodeURIComponent(name)}`}
        >
          <div className="district-name">{name}</div>
          <div className="district-count">{count} jobs</div>
        </a>
      ))}
    </div>
  );
}
