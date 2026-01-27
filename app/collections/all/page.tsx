import AllProductsGrid from "@/components/collections/AllProductsGrid";

export const metadata = {
  title: "All Products | Haddu Clothing",
  description: "Explore the complete Haddu collection. Premium streetwear designed for everyday confidence.",
};

export default function AllCollectionsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '60px 24px 64px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          left: '-40px',
          width: '150px',
          height: '150px',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '-30px',
          width: '120px',
          height: '120px',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '50%'
        }} />

        <p style={{
          fontSize: '11px',
          textTransform: 'uppercase',
          letterSpacing: '0.3em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '12px'
        }}>
          Explore Our Collection
        </p>
        <h1 style={{
          fontSize: 'clamp(28px, 5vw, 42px)',
          fontWeight: '600',
          marginBottom: '12px',
          letterSpacing: '-0.02em'
        }}>
          All Products
        </h1>
        <p style={{
          color: 'rgba(255,255,255,0.6)',
          fontSize: '15px',
          maxWidth: '400px',
          margin: '0 auto'
        }}>
          Premium streetwear for everyday confidence
        </p>
      </div>

      {/* Products */}
      <div className="container" style={{ padding: '40px 16px 60px' }}>
        <AllProductsGrid />
      </div>
    </main>
  );
}
