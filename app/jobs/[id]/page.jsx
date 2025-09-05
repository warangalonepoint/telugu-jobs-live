// app/jobs/page.jsx
import Link from "next/link";

export const metadata = {
  title: "Browse Jobs | Telugu Jobs",
  description: "View all jobs posted across AP & Telangana",
};

async function getJobs() {
  // TODO: replace with Supabase fetch later
  return [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Onestop Tech",
      district: "Warangal",
      type: "Full-Time",
      salary: "₹2.8L - ₹3.6L",
    },
    {
      id: 2,
      title: "Backend Engineer",
      company: "Hyderabad Systems",
      district: "Hyderabad",
      type: "Full-Time",
      salary: "₹2.5L - ₹2.9L",
    },
  ];
}

export default async function JobsPage() {
  const jobs = await getJobs();

  return (
    <main className="container mx-auto px-6 py-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Available Jobs</h1>
      {jobs.length === 0 ? (
        <p>No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-4 border border-gray-700 rounded-lg bg-gray-800"
            >
              <h2 className="text-xl font-semibold">{job.title}</h2>
              <p>{job.company} — {job.district}</p>
              <p>{job.type} | {job.salary}</p>
              <Link href={`/jobs/${job.id}`} className="text-blue-400 hover:underline">
                View Details
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
