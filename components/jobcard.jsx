"use client";

export default function JobCard({ site }) {
  return (
    <a
      href={site.url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-4 rounded-lg shadow-md bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <h3 className="text-lg font-semibold text-white">{site.name}</h3>
      <p className="text-sm text-gray-400">{site.description}</p>
      <span className="text-xs text-gray-500">{site.type}</span>
    </a>
  );
}
