import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ChatWidget } from "@/components/ChatWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  // Needed so the generated link-preview image gets a full https:// URL (LinkedIn requires it).
  metadataBase: new URL("https://yassine-hajkacem.vercel.app"),
  title: "Yassine Hajkacem — Full-Stack & AI Developer",
  description:
    "Portfolio of Yassine Hajkacem, a full-stack and AI developer building AI-powered web apps with React, FastAPI, LangChain, Django, Symfony and ASP.NET Core.",
  openGraph: {
    title: "Yassine Hajkacem — Full-Stack & AI Developer",
    description: "Full-stack & AI developer from Sfax, Tunisia. RAG, LangChain agents, React, FastAPI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0b0f",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body className="min-h-screen font-sans">
        {children}
        <ChatWidget />
      </body>
    </html>
  );
}
