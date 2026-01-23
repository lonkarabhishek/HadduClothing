"use client";

import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/hero12.png"
        alt="Haddu Clothing - Premium Streetwear"
        fill
        priority
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="absolute inset-0 flex items-center">
        <div className="container">
          <div className="max-w-xl text-white">
            <p className="text-sm uppercase tracking-widest mb-4 opacity-90">
              New Collection 2026
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Premium Streetwear
            </h1>
            <p className="text-lg opacity-90 mb-8">
              Designed for everyday confidence. Shop oversized tees, hoodies & more.
            </p>
            <Link
              href="/collections/all"
              className="btn btn-primary text-lg px-10 py-4"
            >
              Shop Now
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 text-center">
        <p className="text-xs uppercase tracking-widest mb-2">Scroll</p>
        <div className="w-px h-8 bg-white/40 mx-auto" />
      </div>
    </section>
  );
}
