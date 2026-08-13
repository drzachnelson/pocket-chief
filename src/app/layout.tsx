import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { AppShell } from "@/components/app-shell";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Pocket Chief", template: "%s · Pocket Chief" },
  description: "A private, reviewed general surgery knowledge atlas.",
  applicationName: "Pocket Chief",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false, nocache: true },
  appleWebApp: { capable: true, title: "Pocket Chief", statusBarStyle: "default" },
  icons: { icon: "/icon.svg", apple: "/icon.svg" },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f7fb" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body><a className="skip-link" href="#main-content">Skip to content</a><AppShell>{children}</AppShell></body>
    </html>
  );
}
