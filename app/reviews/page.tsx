import Link from "next/link";
import { Star } from "lucide-react";

export const metadata = {
  title: "Reviews | Haddu Clothing",
  description: "Read customer reviews for Haddu Clothing products.",
};

export default function ReviewsPage() {
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
        <Star size={40} color="#9ca3af" />
      </div>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#111', marginBottom: '12px' }}>
        Reviews
      </h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '8px' }}>
        Coming Soon
      </p>
      <p style={{ fontSize: '14px', color: '#999', marginBottom: '32px', maxWidth: '300px' }}>
        Customer reviews will be available here soon. Check out our products in the meantime!
      </p>
      <Link
        href="/collections/all"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '48px',
          padding: '0 32px',
          backgroundColor: '#152312',
          color: 'white',
          borderRadius: '8px',
          fontWeight: '600',
          fontSize: '16px'
        }}
      >
        Shop Now
      </Link>
    </main>
  );
}
