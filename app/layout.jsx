import "./globals.css";

export const metadata = {
  title: "Warangal & District Jobs | OneStop",
  description: "Unified search launcher for Warangal and nearby districts.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
