// app/layout.jsx
import "./globals.css";

export const metadata = {
  title: "Telugu Jobs — AP & Telangana",
  description: "Find your dream job in Andhra Pradesh & Telangana. Fresh, local, and fast.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
