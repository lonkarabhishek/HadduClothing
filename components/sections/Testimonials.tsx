"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    quote:
      "The fabric quality instantly stood out. You can feel the craftsmanship the moment you wear it. These are now my go-to everyday essentials.",
    name: "Aarav Mehta",
    role: "Creative Director",
    rating: 5,
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "Minimal, premium, and timeless. Exactly what modern wardrobes need. The attention to detail is exceptional — from stitching to packaging.",
    name: "Ritika Sharma",
    role: "Fashion Buyer",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
  },
  {
    quote:
      "Every detail feels intentional — from stitching to fit. Truly elevated essentials. I've replaced half my wardrobe with Haddu pieces.",
    name: "Kunal Verma",
    role: "Brand Consultant",
    rating: 5,
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 md:py-32 px-5 md:px-8 bg-neutral-50">
      <div className="max-w-6xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-20 text-center"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-[#0C4008] mb-4">
            Testimonials
          </p>
          <h2 className="text-3xl md:text-5xl font-light tracking-wide">
            What People Say
          </h2>
          <p className="mt-5 text-sm text-gray-500 max-w-lg mx-auto">
            Honest words from those who value refined design and quality.
          </p>
        </motion.div>

        {/* TESTIMONIAL GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
          {testimonials.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                ease: [0.4, 0, 0.2, 1],
              }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white p-8 md:p-10 h-full flex flex-col relative overflow-hidden transition-all duration-500 hover:shadow-premium-lg">
                {/* Quote Icon */}
                <div className="absolute top-6 right-6 opacity-5 group-hover:opacity-10 transition-opacity">
                  <Quote size={60} />
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className="fill-[#C9A962] text-[#C9A962]"
                    />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-base md:text-lg leading-relaxed text-gray-700 flex-1 mb-8">
                  "{item.quote}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>
                    <p className="text-xs text-gray-500">{item.role}</p>
                  </div>
                </div>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#0C4008] to-[#C9A962] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 pt-16 border-t border-gray-200"
        >
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 text-gray-400">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-light text-gray-800">10K+</p>
              <p className="text-xs uppercase tracking-wider mt-1">Happy Customers</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-light text-gray-800">4.9</p>
              <p className="text-xs uppercase tracking-wider mt-1">Average Rating</p>
            </div>
            <div className="hidden md:block w-px h-12 bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-light text-gray-800">98%</p>
              <p className="text-xs uppercase tracking-wider mt-1">Would Recommend</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
