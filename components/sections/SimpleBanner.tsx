"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function SimpleBanner() {
  return (
    <section className="relative w-full py-32 md:py-40 px-4 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=1740&auto=format&fit=crop"
          alt="Crafted clothing background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/70 to-black/80" />
      </div>

      {/* Decorative Elements */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        className="absolute top-10 left-10 w-32 h-32 border border-white/20 rounded-full"
      />
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 0.1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="absolute bottom-10 right-10 w-48 h-48 border border-white/20 rounded-full"
      />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto text-center text-white">
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.5em] text-[#C9A962] mb-6"
        >
          Premium Collection
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide"
        >
          Crafted for Everyday Luxury
        </motion.h2>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed"
        >
          Elevated essentials designed with intention, precision, and timeless style.
          Made for those who appreciate the finer details.
        </motion.p>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-10 flex flex-wrap justify-center gap-8 md:gap-16 text-sm"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
            <span className="text-gray-300">Premium Fabrics</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
            <span className="text-gray-300">Ethical Production</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#C9A962]" />
            <span className="text-gray-300">Free Shipping</span>
          </div>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12"
        >
          <Link
            href="/collections/all"
            className="inline-flex items-center gap-3 px-10 py-4 border-2 border-white text-sm uppercase tracking-[0.25em] transition-all duration-300 hover:bg-white hover:text-black group"
          >
            Shop the Collection
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </Link>
        </motion.div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent" />
    </section>
  );
}
