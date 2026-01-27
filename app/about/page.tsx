"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shirt, Heart, Sparkles, Shield, Quote, Instagram } from "lucide-react";

const values = [
  {
    icon: Shirt,
    title: "Premium Fabric",
    description: "The real value of a tee or hoodie lies in the fabric. We choose only the finest materials.",
    number: "01"
  },
  {
    icon: Heart,
    title: "Quality Stitching",
    description: "Every stitch is made with precision and care. Built to last, not to fall apart.",
    number: "02"
  },
  {
    icon: Sparkles,
    title: "Bold but Minimal",
    description: "Clean silhouettes and sharp cuts. Comfortable yet commanding presence.",
    number: "03"
  },
  {
    icon: Shield,
    title: "Armor for Ambition",
    description: "Clothing that matches your hustle. Designed for dreamers building something real.",
    number: "04"
  },
];

const stats = [
  { number: "20+", label: "Years of Hustle" },
  { number: "100%", label: "Self-Made" },
  { number: "Premium", label: "Quality Only" },
  { number: "India", label: "Made With Pride" },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6 }
  }
};

export default function AboutPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fff' }}>

      {/* Hero Section - Full Screen with Animated Elements */}
      <section style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3f5046',
        overflow: 'hidden'
      }}>
        {/* Animated Background Pattern */}
        <div style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.05
        }}>
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse'
            }}
            style={{
              width: '100%',
              height: '100%',
              backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)',
              backgroundSize: '40px 40px'
            }}
          />
        </div>

        {/* Floating Elements */}
        <motion.div
          animate={{ y: [-20, 20, -20] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            top: '15%',
            left: '10%',
            width: '120px',
            height: '120px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}
        />
        <motion.div
          animate={{ y: [20, -20, 20] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: 'absolute',
            bottom: '20%',
            right: '15%',
            width: '80px',
            height: '80px',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '50%'
          }}
        />

        {/* Hero Content */}
        <div style={{ position: 'relative', zIndex: 10, padding: '0 24px', textAlign: 'center', maxWidth: '900px' }}>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            style={{
              display: 'inline-block',
              padding: '8px 24px',
              border: '1px solid rgba(255,255,255,0.3)',
              borderRadius: '50px',
              marginBottom: '32px'
            }}
          >
            <span style={{ color: 'rgba(255,255,255,0.8)', fontSize: '12px', letterSpacing: '0.3em', textTransform: 'uppercase' }}>
              Our Story
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              color: 'white',
              fontSize: 'clamp(36px, 8vw, 72px)',
              fontWeight: '300',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}
          >
            Built on{' '}
            <span style={{
              position: 'relative',
              display: 'inline-block'
            }}>
              <span style={{ position: 'relative', zIndex: 1 }}>20 Years</span>
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: '100%' }}
                transition={{ duration: 0.8, delay: 1 }}
                style={{
                  position: 'absolute',
                  bottom: '8px',
                  left: 0,
                  height: '8px',
                  backgroundColor: 'rgba(255,255,255,0.2)',
                  zIndex: 0
                }}
              />
            </span>
            <br />of Real Hustle
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              color: 'rgba(255,255,255,0.7)',
              fontSize: '18px',
              maxWidth: '600px',
              margin: '0 auto 48px',
              lineHeight: '1.7'
            }}
          >
            No rich parents. No big investors. No easy way in.<br />
            Just grit, vision, and the will to never quit.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link
              href="/collections/all"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '16px 40px',
                backgroundColor: 'white',
                color: '#3f5046',
                fontSize: '13px',
                fontWeight: '600',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                borderRadius: '4px',
                textDecoration: 'none',
                transition: 'transform 0.3s, box-shadow 0.3s'
              }}
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          style={{
            position: 'absolute',
            bottom: '40px',
            left: '50%',
            transform: 'translateX(-50%)'
          }}
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            style={{
              width: '24px',
              height: '40px',
              border: '2px solid rgba(255,255,255,0.3)',
              borderRadius: '12px',
              display: 'flex',
              justifyContent: 'center',
              paddingTop: '8px'
            }}
          >
            <motion.div
              animate={{ opacity: [1, 0, 1], y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              style={{
                width: '4px',
                height: '8px',
                backgroundColor: 'rgba(255,255,255,0.5)',
                borderRadius: '2px'
              }}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* The Name Section - Cards with Glass Effect */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: '#fafafa',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <span style={{
              display: 'inline-block',
              padding: '8px 20px',
              backgroundColor: '#3f5046',
              color: 'white',
              fontSize: '11px',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              borderRadius: '4px',
              marginBottom: '24px'
            }}>
              What's in a Name
            </span>
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: '600',
              color: '#111',
              marginBottom: '16px'
            }}>
              The Meaning of <span style={{ color: '#3f5046' }}>Haddu</span>
            </h2>
            <p style={{ color: '#666', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
              A name with deep roots and powerful meaning
            </p>
          </motion.div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '24px'
          }}>
            {/* Kannada Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e5e5e5',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                backgroundColor: '#3f5046',
                opacity: 0.05,
                borderRadius: '50%'
              }} />
              <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>🦅</span>
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px'
              }}>
                KANNADA
              </div>
              <h3 style={{ fontSize: '32px', fontWeight: '600', color: '#111', marginBottom: '8px' }}>
                "Eagle"
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7', fontSize: '15px' }}>
                Symbolizing power, vision, and freedom. The eagle soars above,
                seeing what others cannot, reaching heights others dare not dream.
              </p>
            </motion.div>

            {/* Telugu Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
              style={{
                padding: '40px',
                backgroundColor: 'white',
                borderRadius: '16px',
                border: '1px solid #e5e5e5',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'default',
                transition: 'all 0.3s ease'
              }}
            >
              <div style={{
                position: 'absolute',
                top: '-30px',
                right: '-30px',
                width: '120px',
                height: '120px',
                backgroundColor: '#3f5046',
                opacity: 0.05,
                borderRadius: '50%'
              }} />
              <span style={{ fontSize: '60px', display: 'block', marginBottom: '20px' }}>⚡</span>
              <div style={{
                display: 'inline-block',
                padding: '4px 12px',
                backgroundColor: '#f3f4f6',
                borderRadius: '4px',
                fontSize: '12px',
                fontWeight: '600',
                color: '#666',
                marginBottom: '12px'
              }}>
                TELUGU
              </div>
              <h3 style={{ fontSize: '32px', fontWeight: '600', color: '#111', marginBottom: '8px' }}>
                "Boundary"
              </h3>
              <p style={{ color: '#666', lineHeight: '1.7', fontSize: '15px' }}>
                Representing self-respect, discipline, and knowing your worth.
                Setting boundaries isn't limitation — it's power.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section - Animated Numbers */}
      <section style={{
        padding: '80px 24px',
        backgroundColor: '#111',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Background Gradient */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(21,35,18,0.5) 0%, transparent 70%)',
          pointerEvents: 'none'
        }} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          style={{
            maxWidth: '1000px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '24px'
          }}
          className="!grid-cols-2 md:!grid-cols-4"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              style={{
                textAlign: 'center',
                padding: '24px',
                borderLeft: index > 0 ? '1px solid rgba(255,255,255,0.1)' : 'none'
              }}
              className={index > 0 ? 'md:border-l border-l-0' : ''}
            >
              <motion.p
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                style={{
                  fontSize: 'clamp(32px, 5vw, 48px)',
                  fontWeight: '300',
                  color: 'white',
                  marginBottom: '8px',
                  letterSpacing: '-0.02em'
                }}
              >
                {stat.number}
              </motion.p>
              <p style={{
                fontSize: '11px',
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'rgba(255,255,255,0.5)'
              }}>
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Values Section - Modern Cards */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: 'white'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center', marginBottom: '60px' }}
          >
            <h2 style={{
              fontSize: 'clamp(28px, 5vw, 48px)',
              fontWeight: '600',
              color: '#111',
              marginBottom: '16px'
            }}>
              Quality Over Everything
            </h2>
            <p style={{ color: '#666', fontSize: '16px', maxWidth: '500px', margin: '0 auto' }}>
              What we stand for in every piece we create
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: '24px'
            }}
          >
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                variants={itemVariants}
                whileHover={{ y: -8 }}
                style={{
                  padding: '32px',
                  backgroundColor: '#fafafa',
                  borderRadius: '16px',
                  position: 'relative',
                  overflow: 'hidden',
                  border: '1px solid transparent',
                  transition: 'all 0.3s ease',
                  cursor: 'default'
                }}
              >
                {/* Number */}
                <span style={{
                  position: 'absolute',
                  top: '20px',
                  right: '20px',
                  fontSize: '48px',
                  fontWeight: '700',
                  color: 'rgba(21,35,18,0.05)'
                }}>
                  {value.number}
                </span>

                {/* Icon */}
                <div style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '12px',
                  backgroundColor: '#3f5046',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '20px'
                }}>
                  <value.icon size={24} color="white" />
                </div>

                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#111',
                  marginBottom: '12px'
                }}>
                  {value.title}
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: '#666',
                  lineHeight: '1.7'
                }}>
                  {value.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section - With Quote */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: '#fafafa',
        position: 'relative'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            style={{ textAlign: 'center' }}
          >
            {/* Quote Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, type: 'spring' }}
              style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: '#3f5046',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 32px'
              }}
            >
              <Quote size={28} color="white" />
            </motion.div>

            <h2 style={{
              fontSize: 'clamp(24px, 4vw, 36px)',
              fontWeight: '400',
              color: '#111',
              marginBottom: '40px',
              lineHeight: '1.5'
            }}>
              "Haddu was created out of 20 years of real-life grind.
              No family wealth. No external investors.
              Just pure determination."
            </h2>

            <div style={{
              width: '60px',
              height: '2px',
              backgroundColor: '#3f5046',
              margin: '0 auto 40px'
            }} />

            <div style={{
              display: 'grid',
              gap: '24px',
              textAlign: 'left'
            }}>
              {[
                "We started with a simple principle: Never quit.",
                "That principle shaped everything — from the fabrics we choose to the designs we create. We know that the real value of a tee or hoodie lies in two things: the fabric and the stitching.",
                "Today, Haddu represents everyone who's building something from nothing. The ones who work while others sleep. The ones who bet on themselves when no one else would."
              ].map((text, i) => (
                <motion.p
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  style={{
                    fontSize: '16px',
                    color: '#555',
                    lineHeight: '1.8',
                    paddingLeft: '24px',
                    borderLeft: '2px solid #e5e5e5'
                  }}
                >
                  {text}
                </motion.p>
              ))}
            </div>

            <motion.p
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              style={{
                marginTop: '48px',
                fontSize: '24px',
                fontWeight: '600',
                color: '#3f5046'
              }}
            >
              This is streetwear for the self-made.
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: '100px 24px',
        backgroundColor: '#3f5046',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative Elements */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '300px',
            height: '300px',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '50%'
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center',
            position: 'relative',
            zIndex: 1
          }}
        >
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)',
            fontWeight: '600',
            color: 'white',
            marginBottom: '20px'
          }}>
            Ready to Wear Your Ambition?
          </h2>
          <p style={{
            fontSize: '16px',
            color: 'rgba(255,255,255,0.7)',
            marginBottom: '40px',
            lineHeight: '1.7'
          }}>
            Discover our collection of premium hoodies and tees crafted for those who hustle.
          </p>

          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center'
          }}>
            <Link
              href="/collections/all"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                backgroundColor: 'white',
                color: '#3f5046',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                textDecoration: 'none',
                transition: 'transform 0.3s'
              }}
            >
              Shop Now
              <ArrowRight size={18} />
            </Link>
            <a
              href="https://www.instagram.com/haddu__clothings/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '16px 40px',
                backgroundColor: 'transparent',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                borderRadius: '8px',
                border: '2px solid rgba(255,255,255,0.3)',
                textDecoration: 'none',
                transition: 'all 0.3s'
              }}
            >
              <Instagram size={18} />
              Follow Us
            </a>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
