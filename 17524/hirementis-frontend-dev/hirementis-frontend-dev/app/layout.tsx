import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "sonner";
const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
});

export const metadata: Metadata = {
  title: "EduPrep-AI – Ace Your Next Interview with AI-Powered Mock Practice",
  description:
    "EduPrep-AI helps job seekers land their dream roles with personalized AI-driven mock interviews, real-time feedback, and a curated question bank tailored to your job role and industry.",
  keywords: [
    "AI mock interview",
    "job interview practice",
    "interview preparation",
    "interview feedback",
    "tech interview platform",
    "HireMentis",
    "mock interview tool",
    "interview training",
    "career preparation",
    "job seekers tool",
  ],
  openGraph: {
    title: "EduPrep-AI – Ace Your Next Interview with AI",
    description:
      "Get ready for your dream job with HireMentis. Practice interviews with AI, receive instant feedback, and sharpen your communication skills with curated questions.",
    url: "https://hirementis.site",
    siteName: "HireMentis",
    images: [
      {
        url: "/hero.png",
        width: 1200,
        height: 630,
        alt: "HireMentis – AI-Powered Interview Practice",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HireMentis – AI-Powered Mock Interviews for Job Seekers",
    description:
      "Practice mock interviews, get AI feedback, and gain confidence before your real job interview – all on one smart platform.",
    images: ["/hero.png"],
  },
  metadataBase: new URL("https://hirementis.site"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en" className={outfit.className}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body suppressHydrationWarning className={`antialiased`}>
        <Navbar />
        <div>{children}</div>
        

        <Toaster richColors closeButton position="top-center" />
      </body>
    </html>
  );
}
