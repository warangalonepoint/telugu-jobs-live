export const metadata = {
  title: "Warangal & District Jobs | OneStop",
  description: "Unified search launcher for Warangal and nearby districts."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">
        <div className="max-w-6xl mx-auto px-4">
          <header className="py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-white/10" />
              <h1 className="text-lg font-semibold tracking-tight">
                OneStop Jobs
              </h1>
            </div>
            <span className="text-xs text-white/60">MVP v1</span>
          </header>
        </div>
        {children}
        <footer className="mt-16 py-10 text-center text-xs text-white/50">
          © {new Date().getFullYear()} Warangal OneStop
        </footer>
      </body>
    </html>
  );
}
