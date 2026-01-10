import "./globals.css";
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollToTop from "@/components/ScrollToTop";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "Haddu Clothing | Premium Streetwear",
  description: "Modern streetwear designed for everyday confidence.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${playfair.variable} font-sans bg-white text-neutral-900`}
      >
        <SmoothScroll>

          <Header />
          <main>{children}
            <ScrollToTop />
          </main>
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}

