"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shirt, Heart, Sparkles, Shield } from "lucide-react";

const values = [
  {
    icon: Shirt,
    title: "Premium Fabric",
    description: "The real value of a tee or hoodie lies in the fabric. We choose only the finest materials.",
  },
  {
    icon: Heart,
    title: "Quality Stitching",
    description: "Every stitch is made with precision and care. Built to last, not to fall apart.",
  },
  {
    icon: Sparkles,
    title: "Bold but Minimal",
    description: "Clean silhouettes and sharp cuts. Comfortable yet commanding presence.",
  },
  {
    icon: Shield,
    title: "Armor for Ambition",
    description: "Clothing that matches your hustle. Designed for dreamers building something real.",
  },
];

const stats = [
  { number: "20+", label: "Years of Hustle" },
  { number: "100%", label: "Self-Made" },
  { number: "Premium", label: "Quality Only" },
  { number: "India", label: "Made With Pride" },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[80vh] overflow-hidden bg-[#152312]">
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40" />

        <div className="relative z-10 h-full flex items-center justify-center text-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <p className="text-xs md:text-sm uppercase tracking-[0.4em] mb-6 text-white/80">
              Our Story
            </p>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light tracking-wide mb-6">
              Built on 20 Years of Real Hustle
            </h1>
            <p className="text-base md:text-lg text-white/90 max-w-2xl mx-auto leading-relaxed">
              No rich parents. No big investors. No easy way in.<br />
              Just grit, vision, and the will to never quit.
            </p>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-px h-12 bg-white/50"
          />
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <p className="text-xs uppercase tracking-[0.3em] text-[#152312] mb-4">
                More Than a Brand
              </p>
              <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-8">
                We&apos;re Building a Movement
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Haddu isn&apos;t just about clothes. It&apos;s about representing the energy of those
                who build with nothing, dream without limits, and rise without permission.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                We speak to the small-town dreamers. The silent hustlers who work in shadows.
                The self-made individuals who know that character matters more than hype.
              </p>
              <p className="text-gray-600 leading-relaxed mb-8">
                Our streetwear is your armor — bold but minimal, comfortable yet commanding.
                Every piece is designed to match your ambition.
              </p>
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-[#152312] hover:gap-5 transition-all"
              >
                Explore Collection
                <ArrowRight size={18} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="aspect-[4/5] relative overflow-hidden bg-gray-100 flex items-center justify-center">
                <div className="text-center p-8">
                  <p className="text-6xl md:text-8xl font-bold text-[#152312]/10">HADDU</p>
                  <p className="text-sm text-gray-500 mt-4">Armor for your ambition</p>
                </div>
              </div>
              {/* Decorative Element */}
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-[#152312]/20 -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* The Name Section */}
      <section className="py-16 md:py-28 px-4 md:px-8 bg-[#152312] text-white">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-xs uppercase tracking-[0.3em] text-white/60 mb-3">
              What&apos;s in a Name
            </p>
            <h2 className="text-2xl md:text-5xl font-light tracking-wide mb-8 md:mb-12">
              The Meaning of Haddu
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-16">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="p-6 md:p-8 border border-white/20 rounded-xl"
            >
              <p className="text-4xl md:text-5xl mb-3">🦅</p>
              <h3 className="text-lg md:text-xl font-semibold mb-1">In Kannada</h3>
              <p className="text-xl md:text-2xl font-light mb-3">&quot;Eagle&quot;</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Symbolizing power, vision, and freedom. The eagle soars above,
                seeing what others cannot, reaching heights others dare not dream.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="p-6 md:p-8 border border-white/20 rounded-xl"
            >
              <p className="text-4xl md:text-5xl mb-3">⚡</p>
              <h3 className="text-lg md:text-xl font-semibold mb-1">In Telugu</h3>
              <p className="text-xl md:text-2xl font-light mb-3">&quot;Boundary&quot;</p>
              <p className="text-white/70 text-sm leading-relaxed">
                Representing self-respect, discipline, and knowing your worth.
                Setting boundaries isn&apos;t limitation — it&apos;s power.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 md:py-28 px-4 md:px-8 bg-neutral-50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-10 md:mb-16"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#152312] mb-3">
              What We Stand For
            </p>
            <h2 className="text-2xl md:text-5xl font-light tracking-wide">
              Quality Over Everything
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 mx-auto mb-4 md:mb-6 rounded-full bg-[#152312]/5 flex items-center justify-center group-hover:bg-[#152312] transition-colors duration-300">
                  <value.icon
                    size={22}
                    className="text-[#152312] group-hover:text-white transition-colors duration-300"
                  />
                </div>
                <h3 className="text-base md:text-lg font-medium mb-2 md:mb-3 tracking-wide">
                  {value.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed px-4 md:px-0">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 md:px-8 bg-[#0A0A0A] text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-light tracking-wide mb-2">
                  {stat.number}
                </p>
                <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-gray-400">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 px-4 md:px-8 bg-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <p className="text-xs uppercase tracking-[0.3em] text-[#152312] mb-4">
              The Beginning
            </p>
            <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-12">
              Created from Real Life
            </h2>

            <div className="text-left space-y-6 text-gray-600 leading-relaxed">
              <p>
                Haddu was created out of 20 years of real-life grind. No family wealth to fall back on.
                No external investors writing checks. Just pure determination and the belief that
                if you want something badly enough, you find a way.
              </p>
              <p>
                We started with a simple principle: <strong className="text-[#152312]">Never quit.</strong>
              </p>
              <p>
                That principle shaped everything — from the fabrics we choose to the designs we create.
                We know that the real value of a tee or hoodie lies in two things: the fabric and the stitching.
                Not the hype. Not the logo. The actual quality you feel when you wear it.
              </p>
              <p>
                Today, Haddu represents everyone who&apos;s building something from nothing.
                The ones who work while others sleep. The ones who bet on themselves when no one else would.
              </p>
              <p className="text-xl text-[#152312] font-medium text-center pt-4">
                This is streetwear for the self-made.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 md:px-8 bg-neutral-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <h2 className="text-3xl md:text-5xl font-light tracking-wide mb-6">
            Ready to Wear Your Ambition?
          </h2>
          <p className="text-gray-600 mb-10 max-w-xl mx-auto">
            Discover our collection of premium hoodies and tees crafted for those who hustle.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/collections/all"
              className="inline-flex items-center justify-center bg-[#152312] text-white px-12 py-4 text-xs uppercase tracking-[0.25em] hover:bg-black transition-colors"
            >
              Shop Now
            </Link>
            <a
              href="https://www.instagram.com/haddu__clothings/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center border-2 border-[#152312] text-[#152312] px-12 py-4 text-xs uppercase tracking-[0.25em] hover:bg-[#152312] hover:text-white transition-colors"
            >
              Follow Us
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
