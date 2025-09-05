import "./globals.css";

export const metadata = {
  title: "Telugu Jobs – AP & Telangana",
  description: "District-filtered deep links to Naukri, Indeed, LinkedIn, Google Jobs, OLX, Freshersworld, Apna.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-neutral-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <header className="flex items-center justify-between">
            <div className="text-lg font-semibold">Telugu Jobs</div>
            <nav className="flex items-center gap-4 text-sm">
              <a className="hover:underline" href="/">Home</a>
              <a className="hover:underline" href="/post-job">Post a Job</a>
            </nav>
          </header>
          {children}
        </div>
      </body>
    </html>
  );
}
