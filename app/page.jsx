// app/page.jsx
import Hero from "@/components/hero";
import SearchBar from "@/components/searchbar";
import DistrictGrids from "@/components/districtgrids";

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
