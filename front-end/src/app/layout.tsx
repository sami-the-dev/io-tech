import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Hero, Footer, TeamSection, Testimonials } from "../components";

const dmSans = DM_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IO-Tech Frontend Developer Assessment",
  description:
    "Interactive web application developed as a technical assessment for the Frontend Developer position at IO-Tech. Demonstrates modern React/Next.js development practices, responsive design, and state management.",
  viewport: "width=device-width, initial-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.className} antialiased`}>
        <Hero />
        {children}
        <Footer />
      </body>
    </html>
  );
}
