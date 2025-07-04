import type { Metadata } from "next";
import Script from "next/script";

import { ROUTES } from "@/constants/routes";

const FRONT_END_URL =
  process.env.NEXT_PUBLIC_URL || "https://boardino.vercel.app";
export const metadata: Metadata = {
  title: "Sign Up - Boardino | Create Your Collaborative Workspace",
  description:
    "Create a new Boardino account to start collaborating with your team. Join thousands of users who manage projects, brainstorm ideas, and track tasks seamlessly.",
  keywords: [
    "signup",
    "register",
    "create account",
    "boardino account",
    "team collaboration",
    "new user",
    "project management",
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
    url: `${FRONT_END_URL}/${ROUTES.signup}`,
    title: "Sign Up - Boardino | Create Your Collaborative Workspace",
    description:
      "Join Boardino to transform your team's productivity. Sign up for free to create interactive boards and manage your projects efficiently.",
    siteName: "Boardino",
    images: [
      {
        url: "/og-signup.png",
        width: 1200,
        height: 630,
        alt: "Boardino Signup - Create Your Account",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sign Up - Boardino | Create Your Collaborative Workspace",
    description:
      "Join Boardino to transform your team's productivity. Sign up for free to create interactive boards.",
    images: ["/og-signup.png"],
    creator: "@boardino",
  },
  alternates: {
    canonical: `${FRONT_END_URL}/${ROUTES.signup}`,
  },
  category: "productivity",
  metadataBase: new URL(FRONT_END_URL),
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Sign Up - Boardino",
  description:
    "Create a new Boardino account to start collaborating with your team and boost productivity.",
  url: `${FRONT_END_URL}/${ROUTES.signup}`,
  isPartOf: {
    "@type": "WebSite",
    name: "Boardino",
    url: FRONT_END_URL,
  },
  potentialAction: {
    "@type": "CreateAction",
    target: `${FRONT_END_URL}/${ROUTES.signup}`,
    name: "Create a Boardino Account",
  },
};

const SignupLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <>
      <Script
        id="signup-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <main role="main">{children}</main>
    </>
  );
};

export default SignupLayout;
