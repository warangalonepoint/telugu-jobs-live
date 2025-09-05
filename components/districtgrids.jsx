"use client";

import JobCard from "./JobCard";

export default function DistrictGrids({ sites }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sites.map((site) => (
        <JobCard key={site.name} site={site} />
      ))}
    </div>
  );
}
