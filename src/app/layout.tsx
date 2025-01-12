import { QueryProvider } from "@/lib/react-query/QueryProvider";
import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Lora } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/context/AuthContext";

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
      <QueryProvider>
        <ClerkProvider>
          <AuthProvider>
            <body className={lora.className}>{children}</body>
          </AuthProvider>
        </ClerkProvider>
      </QueryProvider>
    </html>
  );
}
