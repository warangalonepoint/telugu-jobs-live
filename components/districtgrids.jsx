"use client";

import React from "react";
import JobCard from "./jobcard"; // case matches file: jobcard.jsx

export default function DistrictGrids({ sites = [] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
      {sites.map((site, i) => (
        <JobCard key={site?.id ?? site?.name ?? i} site={site} />
      ))}
    </div>
  );
}

