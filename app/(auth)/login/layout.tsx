import type { Metadata } from "next";
import Script from "next/script";

import { ROUTES } from "@/constants/routes";

const FRONT_END_URL =
  process.env.NEXT_PUBLIC_URL || "https://boardino.vercel.app";

export const metadata: Metadata = {
  title: "Login - Boardino | Secure Access to Your Collaborative Workspace",
  description:
    "Sign in to Boardino to access your collaborative boards, manage projects, and connect with your team. Secure login with multiple authentication options.",
  keywords: [
    "login",
    "sign in",
    "authentication",
    "access",
    "boardino login",
    "team workspace",
    "secure login",
    "user authentication",
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
    url: `${FRONT_END_URL}/${ROUTES.login}`,
    title: "Login - Boardino | Secure Access to Your Collaborative Workspace",
    description:
      "Sign in to Boardino to access your collaborative boards, manage projects, and connect with your team. Secure login with multiple authentication options.",
    siteName: "Boardino",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Boardino Login - Access Your Workspace",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Login - Boardino | Secure Access to Your Collaborative Workspace",
    description:
      "Sign in to Boardino to access your collaborative boards and manage projects with your team.",
    images: ["/og-image.png"],
    creator: "@boardino",
  },
  alternates: {
    canonical: `${FRONT_END_URL}/${ROUTES.login}`,
  },
  category: "productivity",
  metadataBase: new URL(FRONT_END_URL),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Login - Boardino",
  description:
    "Sign in to Boardino to access your collaborative boards, manage projects, and connect with your team. Secure login with multiple authentication options.",
  url: `${FRONT_END_URL}/${ROUTES.login}`,
  isPartOf: {
    "@type": "WebSite",
    name: "Boardino",
    url: FRONT_END_URL,
  },
  potentialAction: {
    "@type": "LoginAction",
    target: `${FRONT_END_URL}/${ROUTES.login}`,
    name: "Login to Boardino",
  },
};

const LoginLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Script
        id="login-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main role="main">{children}</main>
    </>
  );
};

export default LoginLayout;
