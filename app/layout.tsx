import type { Metadata } from "next";
import Script from "next/script";

import { ToastContainer } from "react-toastify";
import { SessionProvider } from "next-auth/react";
import { Analytics } from "@vercel/analytics/next";

import { auth } from "@/auth";
import OfflineToast from "@/components/common/OfflineIndicator";
import { geistMono, geistSans } from "@/constants/fonts";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const FRONT_END_URL =
  process.env.NEXT_PUBLIC_URL || "https://boardino.vercel.app";

export const metadata: Metadata = {
  title: "Boardino - Collaborative Board Platform for Teams",
  description:
    "Transform your team collaboration with Boardino. Create interactive boards for project management, brainstorming, and task tracking. Boost productivity with our intuitive drag-and-drop interface.",
  keywords: [
    "collaboration",
    "project management",
    "team boards",
    "task tracking",
    "productivity",
    "kanban",
    "workspace",
  ],
  authors: [{ name: "Boardino Team" }],
  creator: "Boardino",
  publisher: "Boardino",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${FRONT_END_URL}`,
    title: "Boardino - Collaborative Board Platform for Teams",
    description:
      "Transform your team collaboration with Boardino. Create interactive boards for project management, brainstorming, and task tracking. Boost productivity with our intuitive drag-and-drop interface.",
    siteName: "Boardino",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Boardino - Collaborative Board Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Boardino - Collaborative Board Platform for Teams",
    description:
      "Transform your team collaboration with Boardino. Create interactive boards for project management, brainstorming, and task tracking.",
    images: ["/og-image.png"],
    creator: "@boardino",
  },
  alternates: {
    canonical: `${FRONT_END_URL}`,
  },
  category: "productivity",
  metadataBase: new URL(FRONT_END_URL),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Boardino",
  description:
    "Collaborative board platform for teams to manage projects and boost productivity",
  url: `${FRONT_END_URL}`,
  applicationCategory: "ProductivityApplication",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
    description: "Free trial available",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

const RootLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await auth();
  return (
    <html lang="en" suppressHydrationWarning>
      <Script
        id="home-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <SessionProvider session={session}>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
          <Analytics />
          <OfflineToast />
        </body>
      </SessionProvider>
    </html>
  );
};

export default RootLayout;
