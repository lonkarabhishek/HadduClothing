import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export const metadata = {
  title: "Contact Us | Haddu Clothing",
  description: "Get in touch with Haddu Clothing for any queries.",
};

export default function ContactPage() {
  return (
    <main style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '32px 24px',
      textAlign: 'center',
      backgroundColor: '#fafafa'
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
        <Phone size={40} color="#152312" />
      </div>

      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
        Contact Us
      </h1>

      <p style={{ fontSize: '16px', color: '#666', marginBottom: '8px' }}>
        For now please contact Sharath at
      </p>

      <a
        href="tel:+919663745344"
        style={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: '#152312',
          marginBottom: '32px',
          textDecoration: 'none'
        }}
      >
        +91 9663745344
      </a>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <a
          href="tel:+919663745344"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '8px',
            height: '48px',
            padding: '0 24px',
            backgroundColor: '#152312',
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
          href="https://wa.me/919663745344"
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
    </main>
  );
}
