"use client";

export default function Hero() {
  return (
    <section
      className="relative bg-cover bg-center h-64 md:h-96 flex items-center justify-center"
      style={{ backgroundImage: "url('/hero.jpg')" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-60" />
      <div className="relative z-10 text-center">
        <h1 className="text-3xl md:text-5xl font-bold text-white">
          Find Jobs Fast
        </h1>
        <p className="text-gray-300 mt-2 text-lg">
          Search across 59 districts in Telangana & Andhra Pradesh
        </p>
      </div>
    </section>
  );
}
