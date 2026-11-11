import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { AppShell } from "@/components/app-shell";
import { themeInitScript } from "@/lib/theme";
import "./globals.css";

// Next prefixes basePath onto <Link> but not onto metadata icon hrefs; mirrors manifest.ts.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export const metadata: Metadata = {
  title: { default: "Pocket Chief", template: "%s · Pocket Chief" },
  description: "General surgery reference",
  applicationName: "Pocket Chief",
  manifest: "/manifest.webmanifest",
  robots: { index: false, follow: false, nocache: true },
  appleWebApp: { capable: true, title: "Pocket Chief", statusBarStyle: "default" },
  icons: { icon: `${basePath}/icon.svg`, apple: `${basePath}/icon.svg` },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f6fa" },
    { media: "(prefers-color-scheme: dark)", color: "#0b1020" },
  ],
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children, contents }: Readonly<{ children: React.ReactNode; contents: React.ReactNode }>) {
  return (
    <html lang="en" className={GeistSans.variable} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: themeInitScript }} /></head>
      <body><a className="skip-link" href="#main-content">Skip to content</a><AppShell contents={contents}>{children}</AppShell></body>
    </html>
  );
}
