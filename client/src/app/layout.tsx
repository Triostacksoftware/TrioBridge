import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Head from "next/head";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "TrioBridge – Empower Intern Excellence | Triostack",
  description:
    "TrioBridge by Triostack is a modern HR platform for onboarding, training, and performance management – crafted for growing teams.",
  keywords: [
    "TrioBridge",
    "Triostack",
    "intern management platform",
    "onboarding system",
    "HR SaaS",
    "training dashboard",
    "performance tracking",
  ],
  metadataBase: new URL("https://triobridge.triostack.in"),
  openGraph: {
    title: "TrioBridge – Intern HR Platform by Triostack",
    description:
      "Onboard, train, and track interns effortlessly with TrioBridge – Triostack's internal HR excellence suite.",
    url: "https://triobridge.triostack.in",
    siteName: "TrioBridge",
    type: "website",
    images: [
      {
        url: "https://triobridge.triostack.in/og-image.png",
        width: 1200,
        height: 630,
        alt: "TrioBridge by Triostack",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  twitter: {
    card: "summary_large_image",
    title: "TrioBridge – Intern HR Platform by Triostack",
    description:
      "Empower your team’s intern lifecycle with TrioBridge: Onboarding, Training & Performance in one place.",
    images: ["https://triobridge.triostack.in/og-image.png"],
    site: "@triostack",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "TrioBridge",
              url: "https://triobridge.triostack.in",
              applicationCategory: "BusinessApplication",
              operatingSystem: "All",
              description:
                "TrioBridge by Triostack is an internal HR, onboarding, training, and performance management platform designed to empower interns and teams.",
              offers: {
                "@type": "Offer",
                price: "0.00",
                priceCurrency: "INR",
              },
              author: {
                "@type": "Organization",
                name: "Triostack Technologies Pvt. Ltd.",
                url: "https://triostack.in",
              },
              publisher: {
                "@type": "Organization",
                name: "Triostack Technologies Pvt. Ltd.",
                logo: {
                  "@type": "ImageObject",
                  url: "https://triobridge.triostack.in/logo.png",
                },
              },
              image: "https://triobridge.triostack.in/og-image.png",
              sameAs: [
                "https://www.linkedin.com/company/triostack",
                "https://triostack.in",
              ],
            }),
          }}
        />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
