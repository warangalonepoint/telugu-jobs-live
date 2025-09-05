import "./globals.css";

export const metadata = {
  title: "Telugu Jobs – AP & Telangana",
  description: "Unified job search launcher + local job postings for Andhra Pradesh & Telangana.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gray-950 text-white">
        {/* Site Header */}
        <header className="p-4 flex justify-between items-center border-b border-gray-800">
          <h1 className="text-lg font-bold">Telugu Jobs</h1>
          <nav className="flex gap-4 text-sm">
            <a href="/" className="hover:underline">Home</a>
            <a href="/jobs" className="hover:underline">Jobs</a>
            <a href="/post-job" className="hover:underline">Post a Job</a>
          </nav>
        </header>

        {/* Page Content */}
        <main className="p-4">{children}</main>

        {/* Site Footer */}
        <footer className="p-4 text-center text-xs text-gray-400 border-t border-gray-800">
          © {new Date().getFullYear()} Telugu Jobs · Built on Next.js + Supabase
        </footer>
      </body>
    </html>
  );
}
