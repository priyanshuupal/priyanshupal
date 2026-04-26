import type { Metadata } from "next";
import { Geist, Geist_Mono, Bitcount_Prop_Single } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/SmoothScroll";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const bitcount = Bitcount_Prop_Single({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-bitcount",
  display:"swap",
});

export const metadata: Metadata = {
  title: "Priyanshu Pal",
  description: "Portfolio of Priyanshu Pal",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${bitcount.variable} antialiased`}
      >
        <SmoothScroll />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
