export const metadata = {
  title: "Telugu Jobs – AP & Telangana",
  description: "Find your dream job in Andhra Pradesh & Telangana. Powered by Next.js + Supabase.",
};

import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <header className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-2xl font-bold">Telugu Jobs</h1>
            <nav>
              <a href="/" className="px-3">Home</a>
              <a href="/post-job" className="px-3">Post a Job</a>
            </nav>
          </div>
        </header>
        
        <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
        
        <footer className="bg-gray-800 text-gray-200 text-center py-4">
          © {new Date().getFullYear()} Telugu Jobs • Built on Next.js + Supabase
        </footer>
      </body>
    </html>
  );
}
