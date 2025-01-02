import Footer from "@/components/Shared/Footer";
import Navbar from "@/components/Shared/Navbar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  );
}
