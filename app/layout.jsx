import "./globals.css";

export const metadata = {
  title: "Telugu Jobs",
  description: "Jobs in AP & Telangana",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        {children}
      </body>
    </html>
  );
}
