export const metadata = {
  title: "Telugu Jobs — AP & Telangana",
  description: "Latest jobs across Andhra Pradesh & Telangana with fast local search."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="container">
          <header className="header">
            <div className="brand">
              <div className="logo" />
              <div className="name">Telugu Jobs</div>
            </div>
            <nav style={{display:'flex',gap:10}}>
              <a href="/" className="ghost">Home</a>
              <a href="/post-job" className="primary">Post a Job</a>
            </nav>
          </header>
          {children}
          <footer className="footer">© {new Date().getFullYear()} Telugu Jobs • Built on Next.js + Supabase</footer>
        </div>
      </body>
    </html>
  );
}
