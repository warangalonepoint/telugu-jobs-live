// ✅ no "use client" here
export const metadata = {
  title: "Post a Job | Telugu Jobs",
  description: "Submit a local job listing.",
};

import PostJobForm from "./PostJobForm";

export default function PostJobPage() {
  return <PostJobForm />;
}
