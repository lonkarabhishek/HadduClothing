import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Haddu Clothing",
  description: "Get in touch with Haddu Clothing for any queries.",
};

export default function ContactPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header Banner */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '60px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-40px', left: '-40px', width: '150px', height: '150px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-30px', right: '-30px', width: '120px', height: '120px', border: '1px solid rgba(255,255,255,0.06)', borderRadius: '50%' }} />
        <p style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.3em', color: 'rgba(255,255,255,0.5)', marginBottom: '12px' }}>
          Get In Touch
        </p>
        <h1 style={{ fontSize: 'clamp(28px, 5vw, 42px)', fontWeight: '600', marginBottom: '12px', letterSpacing: '-0.02em' }}>
          Contact Us
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '15px', maxWidth: '400px', margin: '0 auto' }}>
          We&apos;re here to help
        </p>
      </div>

      {/* Content */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '48px 24px 60px',
        textAlign: 'center'
      }}>
        <div style={{
          width: '96px',
          height: '96px',
          borderRadius: '50%',
          backgroundColor: '#f3f4f6',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '24px'
        }}>
          <Phone size={40} color="#3f5046" />
        </div>

        <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
          For now please contact Sharath at
        </p>

      <a
        href="tel:+918050061499"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#3f5046',
          marginBottom: '32px',
          textDecoration: 'none'
        }}
      >
        +91 8050061499
      </a>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="tel:+918050061499"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            padding: '0 24px',
            backgroundColor: '#3f5046',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            textDecoration: 'none'
          }}
        >
          <Phone size={18} />
          Call Now
        </a>

        <a
          href="https://wa.me/918050061499"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            padding: '0 24px',
            backgroundColor: '#25D366',
            color: 'white',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '16px',
            textDecoration: 'none'
          }}
        >
          <MessageCircle size={18} />
          WhatsApp
        </a>
      </div>

        <p style={{
          fontSize: '14px',
          color: '#999',
          marginTop: '32px',
          maxWidth: '300px'
        }}>
          We typically respond within a few hours during business hours (10 AM - 7 PM IST)
        </p>
      </div>
    </main>
  );
}
