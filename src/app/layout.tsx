import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohit Sengar",
  description:
    "Mohit Sengar is a visionary Technology Leader and Founder with over 11 years of industry experience.",
  openGraph: {
    title: "Mohit Sengar",
    description:
      "Mohit Sengar is a visionary Technology Leader and Founder with over 11 years of industry experience.",
    url: "https://www.mohitsengar.org",
    siteName: "Mohit Sengar",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-US">
      <body>{children}</body>
    </html>
  );
}
