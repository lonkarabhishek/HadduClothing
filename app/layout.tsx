import "./globals.css";
import type { Metadata, Viewport } from "next";
import { DM_Sans } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartSlideOver from "@/components/cart/CartSlideOver";
import { CartProvider } from "./context/CartContext";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dm-sans",
});

export const metadata: Metadata = {
  title: "Haddu Clothing | Premium Streetwear",
  description: "Premium streetwear designed for everyday confidence. Shop oversized tees, hoodies & more.",
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico" },
    ],
    apple: "/favicon.ico",
  },
  openGraph: {
    title: "Haddu Clothing | Premium Streetwear",
    description: "Premium streetwear designed for everyday confidence.",
    siteName: "Haddu Clothing",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#3f5046",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} font-sans bg-white text-black`}>
        <CartProvider>
          <Header />
          <main>{children}</main>
          <Footer />
          <CartSlideOver />
        </CartProvider>
      </body>
    </html>
  );
}
