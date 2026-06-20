import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muhammad Adeel Iqbal — WordPress Developer & WooCommerce Specialist",
  description: "I build WordPress & WooCommerce websites for businesses in UAE, UK, and USA. 50+ projects, 3+ years, Elementor Pro, custom plugins, Figma to WordPress.",
  keywords: "WordPress developer, WooCommerce specialist, Elementor Pro, custom WordPress plugin, Figma to WordPress, website redesign, WordPress speed optimization, UAE WordPress developer",
  authors: [{ name: "Muhammad Adeel Iqbal" }],
  openGraph: {
    title: "Muhammad Adeel Iqbal — WordPress Developer",
    description: "Building fast, high-impact WordPress & WooCommerce websites for UAE, UK & USA clients. 50+ projects delivered.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Adeel Iqbal — WordPress Developer",
    description: "Building fast WordPress & WooCommerce websites for UAE, UK & USA clients.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
