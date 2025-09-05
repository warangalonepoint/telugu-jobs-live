import "./globals.css";

export const metadata = {
  title: "Telugu Jobs – AP & Telangana",
  description: "Latest jobs across Andhra Pradesh & Telangana with fast local search.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <div className="container mx-auto p-4">
          <header className="flex justify-between items-center mb-6">
            <div className="text-xl font-bold">Telugu Jobs</div>
            <nav className="space-x-4">
              <a href="/" className="text-gray-600 hover:text-black">Home</a>
              <a href="/post-job" className="text-blue-600 hover:text-blue-800">Post a Job</a>
            </nav>
          </header>

          {children}

          <footer className="text-center text-gray-500 mt-6">
            © {new Date().getFullYear()} Telugu Jobs · Built on Next.js + Supabase
          </footer>
        </div>
      </body>
    </html>
  );
}
