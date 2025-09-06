import Hero from "@/components/hero";
import SearchBar from "@/components/searchbar";
import DistrictGrids from "@/components/districtgrids";

export const metadata = {
  title: "Telugu Jobs – AP & Telangana",
  description: "Find jobs across Andhra Pradesh & Telangana in one launcher.",
};

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-8">
      {/* Banner */}
      <Hero />

      {/* Search Section */}
      <section className="mb-8">
        <SearchBar />
      </section>

      {/* District Grid Section */}
      <section>
        <DistrictGrids />
      </section>
    </main>
  );
}
