"use client";

import Link from "next/link";
import Image from "next/image";
import { Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#3f5046] text-white">
      <div className="container py-10 md:py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/logo.webp"
              alt="Haddu Clothing"
              width={100}
              height={28}
              className="brightness-0 invert"
            />
          </Link>

          {/* Links */}
          <nav className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <Link href="/collections/all" className="text-white/70 hover:text-white">
              Shop
            </Link>
            <Link href="/about" className="text-white/70 hover:text-white">
              About
            </Link>
            <Link href="/contact" className="text-white/70 hover:text-white">
              Contact
            </Link>
            <Link href="/privacy" className="text-white/70 hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="text-white/70 hover:text-white">
              Terms
            </Link>
          </nav>

          {/* Social */}
          <a
            href="https://www.instagram.com/haddu__clothings/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/70 hover:text-white"
            aria-label="Instagram"
          >
            <Instagram size={22} />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/10 text-center text-sm text-white/50">
          © {new Date().getFullYear()} Haddu Clothing
        </div>
      </div>
    </footer>
  );
}
