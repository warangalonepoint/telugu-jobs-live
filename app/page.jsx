"use client";

import Hero from "@/components/hero";          // matches hero.jsx
import SearchBar from "@/components/searchbar"; // matches searchbar.jsx
import DistrictGrids from "@/components/districtgrids"; // matches districtgrids.jsx

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />

      <section className="mx-auto max-w-6xl px-4 py-6">
        <SearchBar />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-12">
        <DistrictGrids />
      </section>
    </main>
  );
}
