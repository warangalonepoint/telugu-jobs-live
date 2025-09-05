type BuildArgs = { district: string; q: string };

const enc = (s: string) => encodeURIComponent(s.trim());
const qx = (district: string, q: string) =>
  q ? `${enc(q)} ${enc(district)} jobs` : `${enc(district)} jobs`;

export function buildSiteLinks({ district, q }: BuildArgs) {
  const pretty = (url: string) => url.replace(/^https?:\/\//, "");

  return [
    {
      name: "Google Jobs",
      url: `https://www.google.com/search?q=${qx(district, q)}`,
      caption: "Aggregated listings via Google",
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/jobs/search/?keywords=${enc(q || "jobs")}+${enc(district)}&location=India`,
      caption: "Professional jobs & filters",
    },
    {
      name: "Naukri",
      url: `https://www.naukri.com/${enc(q || "jobs")}-jobs-in-${enc(district)}`,
      caption: "India’s biggest job board",
    },
    {
      name: "Indeed",
      url: `https://in.indeed.com/jobs?q=${enc(q || "jobs")}&l=${enc(district)}`,
      caption: "General + local roles",
    },
    {
      name: "OLX Jobs",
      url: `https://www.olx.in/jobs_c3/q-${enc(q || "job")}/?search[description]=${enc(district)}`,
      caption: "Local blue-collar gigs",
    },
    {
      name: "Freshersworld",
      url: `https://www.freshersworld.com/jobs-in-${enc(district.toLowerCase())}`,
      caption: "Fresher + govt jobs",
    },
    {
      name: "Apna Jobs",
      url: `https://apna.co/jobs/search?query=${enc(q || "job")}&location=${enc(district)}`,
      caption: "Mobile-first local jobs",
    }
  ].map(s => ({ ...s, pretty: pretty(s.url) }));
}
