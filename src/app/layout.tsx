import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Shared/Navbar";
import { Toaster } from "@/components/ui/toaster";
import Footer from "@/components/Shared/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const lora = Lora({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Rwanda Nziza",
    absolute: "Rwandanziza",
  },
  description: "A full-stack e-commerce application built with Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ClerkProvider>
        <body className={lora.className}>
          <Navbar />
          {children}
          <Footer />
          <Toaster />
        </body>
      </ClerkProvider>
    </html>
  );
}
