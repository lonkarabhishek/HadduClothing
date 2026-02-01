import AllProductsGrid from "@/components/collections/AllProductsGrid";

export const metadata = {
  title: "All Products | Haddu Clothing",
  description: "Explore the complete Haddu collection. Premium streetwear designed for everyday confidence.",
};

export default function AllCollectionsPage() {
  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header - minimal */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '16px 24px',
        textAlign: 'center'
      }}>
        <h1 style={{
          fontSize: '18px',
          fontWeight: '600',
          letterSpacing: '-0.01em'
        }}>
          Latest Collection
        </h1>
      </div>

      {/* Products */}
      <div className="container" style={{ padding: '24px 16px 60px' }}>
        <AllProductsGrid />
      </div>
    </main>
  );
}
