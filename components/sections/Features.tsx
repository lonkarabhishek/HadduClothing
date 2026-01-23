"use client";

import { motion } from "framer-motion";
import { Truck, RotateCcw, Shield, Award, Leaf, HeartHandshake } from "lucide-react";

const features = [
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders above Rs. 999 across India",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "7-day hassle-free return policy",
  },
  {
    icon: Shield,
    title: "Secure Payment",
    description: "100% secure payment processing",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description: "Handpicked fabrics, expert craftsmanship",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description: "Eco-friendly materials and practices",
  },
  {
    icon: HeartHandshake,
    title: "Customer Support",
    description: "Dedicated support team at your service",
  },
];

export default function Features() {
  return (
    <section className="py-16 md:py-20 px-5 md:px-8 bg-white border-y border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="w-14 h-14 mx-auto mb-4 rounded-full bg-[#0C4008]/5 flex items-center justify-center group-hover:bg-[#0C4008] transition-colors duration-300">
                <feature.icon
                  size={22}
                  className="text-[#0C4008] group-hover:text-white transition-colors duration-300"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="text-sm font-medium mb-1">{feature.title}</h3>
              <p className="text-xs text-gray-500 leading-relaxed max-w-[160px] mx-auto">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
