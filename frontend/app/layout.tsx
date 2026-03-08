import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tech Job Market Index",
  description:
    "Software job postings (FRED/Indeed) vs. CS university enrollment trends",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-900 min-h-screen">{children}</body>
    </html>
  );
}
