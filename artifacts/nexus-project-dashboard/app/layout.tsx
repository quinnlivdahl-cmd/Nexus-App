import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const incomingHeaders = await headers();
  const host = incomingHeaders.get("x-forwarded-host") ?? incomingHeaders.get("host") ?? "localhost:3000";
  const protocol = incomingHeaders.get("x-forwarded-proto") ?? (host.includes("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;

  return {
    title: "Nexus Game · Project Control",
    description: "Private, owner-only command center for the Nexus Game player-loop roadmap, worktrees, ticket alignment, and Codex launch packets.",
    metadataBase: new URL(origin),
    openGraph: {
      title: "Nexus Game · Project Control",
      description: "A derived command center for player-loop development.",
      type: "website",
      images: [{ url: `${origin}/og.png`, width: 1732, height: 908, alt: "Nexus Project Control player-loop development" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Nexus Game · Project Control",
      description: "A derived command center for player-loop development.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>{children}</body>
    </html>
  );
}
