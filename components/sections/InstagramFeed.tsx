"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Instagram } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1558171813-4c088753af8f?w=400&h=400&fit=crop",
  "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=400&h=400&fit=crop",
];

export default function InstagramFeed() {
  return (
    <section className="py-16 md:py-24 px-5 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <Instagram size={24} className="text-[#0C4008]" />
            <span className="text-sm uppercase tracking-[0.3em] text-[#0C4008]">
              @hadduclothing
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-light tracking-wide">
            Follow Us on Instagram
          </h2>
          <p className="mt-4 text-sm text-gray-500">
            Join our community and share your Haddu moments
          </p>
        </motion.div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {images.map((image, index) => (
            <motion.a
              key={index}
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative aspect-square overflow-hidden group"
            >
              <Image
                src={image}
                alt={`Instagram post ${index + 1}`}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                <Instagram
                  size={32}
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
