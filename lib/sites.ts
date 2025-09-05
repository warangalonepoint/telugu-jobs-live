type BuildArgs = { district: string; q: string };

const enc = (s: string) => encodeURIComponent(s.trim());
const qx = (district: string, q: string) =>
  q ? `${enc(q)} ${enc(district)} jobs` : `${enc(district)} jobs`;

export function buildSiteLinks({ district, q }: BuildArgs) {
  const prettyOf = (url: string) => url.replace(/^https?:\/\//, "");

  const items = [
    {
      name: "Google Jobs",
      url: `https://www.google.com/search?q=${qx(district, q)}`,
      caption: "Aggregated listings via Google",
      regionLabel: "IN"
    },
    {
      name: "LinkedIn",
      url: `https://www.linkedin.com/jobs/search/?keywords=${enc(q || "jobs")}+${enc(district)}&location=India`,
      caption: "Professional roles & filters",
      regionLabel: "IN"
    },
    {
      name: "Naukri",
      url: `https://www.naukri.com/${enc(q || "jobs")}-jobs-in-${enc(district)}`,
      caption: "India’s biggest job board",
      regionLabel: "IN"
    },
    {
      name: "Indeed",
      url: `https://in.indeed.com/jobs?q=${enc(q || "job")}&l=${enc(district)}`,
      caption: "General + local roles",
      regionLabel: "IN"
    },
    {
      name: "OLX (Jobs)",
      url: `https://www.olx.in/jobs_c3/q-${enc(q || "job")}/?search[filter_enum_state]=telangana&search[description]=${enc(district)}`,
      caption: "Local/blue-collar gigs",
      regionLabel: "Local"
    },
    {
      name: "Freshersworld",
      url: `https://www.freshersworld.com/jobs-in-${enc(district.toLowerCase())}`,
      caption: "Fresher + govt exams",
      regionLabel: "IN"
    },
    {
      name: "Apna",
      url: `https://apna.co/jobs/search?query=${enc(q || "job")}&location=${enc(district)}`,
      caption: "Hyperlocal, mobile-first",
      regionLabel: "Local"
    }
  ];

  return items.map((x) => ({ ...x, pretty: prettyOf(x.url) }));
}
