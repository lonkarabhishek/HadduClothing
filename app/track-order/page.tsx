import Link from "next/link";
import { Package } from "lucide-react";

export const metadata = {
  title: "Track Order | Haddu Clothing",
  description: "Track your Haddu Clothing order status.",
};

export default function TrackOrderPage() {
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
        <Package size={40} color="#9ca3af" />
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
        Track Order
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '8px' }}>
        Coming Soon
      </p>
      <p style={{ fontSize: '14px', color: '#999', marginBottom: '32px', maxWidth: '300px' }}>
        We&apos;re working on this feature. For now, please contact us for order updates.
      </p>
      <Link
        href="/contact"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          padding: '0 32px',
          backgroundColor: '#3f5046',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '16px'
        }}
      >
        Contact Us
      </Link>
    </main>
  );
}
