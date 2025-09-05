import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Telugu Jobs — AP & Telangana",
  description: "Fresh, local jobs for AP & Telangana. Built on Next.js + Supabase.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[rgb(var(--bg))] text-[rgb(var(--fg))]`}>
        {/* Top bar */}
        <header className="border-b border-gray-200/70">
          <div className="container-app flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-2xl bg-orange-500 text-white font-bold">
                TJ
              </div>
              <div>
                <div className="text-lg font-semibold">Telugu Jobs</div>
                <div className="text-xs text-gray-500">AP &amp; Telangana</div>
              </div>
            </div>

            <a href="/post-job" className="btn btn-primary">
              Post a Job
            </a>
          </div>
        </header>

        <main className="container-app py-8">{children}</main>

        <footer className="container-app footer">
          © {new Date().getFullYear()} Telugu Jobs • Built on Next.js + Supabase
        </footer>
      </body>
    </html>
  );
}
