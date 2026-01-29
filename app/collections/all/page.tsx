import AllProductsGrid from "@/components/collections/AllProductsGrid";

export const metadata = {
  title: "All Products | Haddu Clothing",
  description: "Explore the complete Haddu collection. Premium streetwear designed for everyday confidence.",
};

export default function AllCollectionsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header - styled */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '28px 24px 32px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '10%',
          width: '100px',
          height: '100px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30px',
          right: '15%',
          width: '80px',
          height: '80px',
          border: '1px solid rgba(255,255,255,0.06)',
          borderRadius: '50%'
        }} />

        <p style={{
          fontSize: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.25em',
          color: 'rgba(255,255,255,0.5)',
          marginBottom: '8px'
        }}>
          Haddu Clothing
        </p>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: '600',
          letterSpacing: '-0.02em',
          position: 'relative'
        }}>
          Latest Collection
        </h1>
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          margin: '12px auto 0'
        }} />
      </div>

      {/* Products with subtle side accents on desktop */}
      <div style={{ position: 'relative' }}>
        {/* Left decorative sidebar - desktop only */}
        <div className="hidden lg:block" style={{
          position: 'absolute',
          left: 0,
          top: '60px',
          bottom: '60px',
          width: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          paddingTop: '40px'
        }}>
          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, #e0e0e0, transparent)' }} />
          <span style={{ writingMode: 'vertical-rl', fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase' }}>Premium Quality</span>
          <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, #e0e0e0, transparent)' }} />
        </div>

        {/* Right decorative sidebar - desktop only */}
        <div className="hidden lg:block" style={{
          position: 'absolute',
          right: 0,
          top: '60px',
          bottom: '60px',
          width: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '24px',
          paddingTop: '40px'
        }}>
          <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, transparent, #e0e0e0, transparent)' }} />
          <span style={{ writingMode: 'vertical-rl', fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase' }}>Streetwear</span>
          <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, #e0e0e0, transparent)' }} />
        </div>

        <div className="container" style={{ padding: '32px 16px 60px' }}>
          <AllProductsGrid />
        </div>
      </div>
    </main>
  );
}
