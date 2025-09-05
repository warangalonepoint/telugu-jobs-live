import { notFound } from "next/navigation";
import Link from "next/link";
import { DISTRICTS } from "@/data/districts";
import { buildSiteLinks } from "@/lib/sites";

type Params = { district: string; keyword: string };

export async function generateMetadata({ params }: { params: Params }) {
  const districtName = unslug(params.district);
  const kw = unslug(params.keyword);
  const title = `${capitalize(kw)} jobs in ${districtName} | Telugu Jobs`;
  const description = `Open ${kw} jobs in ${districtName} across Naukri, Indeed, LinkedIn, Google Jobs, OLX, Freshersworld, Apna.`;
  return { title, description };
}

export default function Page({ params }: { params: Params }) {
  const districtName = unslug(params.district);
  const kw = unslug(params.keyword);

  // validate district (keeps URLs clean)
  if (!DISTRICTS.includes(districtName)) {
    return notFound();
  }

  const links = buildSiteLinks({ district: districtName, q: kw === "jobs" ? "" : kw });

  return (
    <main className="max-w-6xl mx-auto px-4 pb-16">
      <section className="card mt-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">
              {capitalize(kw)} jobs in {districtName}
            </h1>
            <p className="text-sm text-white/60">
              Launcher: Naukri, Indeed, LinkedIn, Google Jobs, OLX, Freshersworld, Apna.
            </p>
          </div>
          <Link href="/" className="btn">← Change district/keyword</Link>
        </div>
      </section>

      <section className="mt-6">
        <div className="site-grid">
          {links.map((site) => (
            <a
              key={site.name}
              className="card hover:scale-[1.01] transition"
              href={site.url}
              target="_blank"
              rel="noreferrer"
            >
              <div className="flex items-center justify-between">
                <div className="text-sm font-semibold">{site.name}</div>
                <span className="text-[10px] text-white/50">↗</span>
              </div>
              <p className="mt-2 text-sm text-white/70">{site.caption}</p>
              <div className="mt-3 text-xs text-white/40 break-all">{site.pretty}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="mt-10 card">
        <h4 className="text-sm font-semibold">Switch district</h4>
        <div className="mt-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
          {DISTRICTS.slice(0,24).map((d) => (
            <Link
              key={d}
              className="btn text-xs"
              href={`/jobs/${slug(d)}/${slug(kw)}`}
            >
              {d}
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

/* utils */
const slug = (s: string) => s.toLowerCase().replace(/\s+/g, "-");
const unslug = (s: string) => s.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());
const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);
