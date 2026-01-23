import AllProductsGrid from "@/components/collections/AllProductsGrid";

export const metadata = {
  title: "All Products | Haddu Clothing",
  description: "Explore the complete Haddu collection. Premium streetwear designed for everyday confidence.",
};

export default function AllCollectionsPage() {
  return (
    <main className="min-h-screen">
      {/* Header */}
      <div className="bg-[#152312] text-white py-10 md:py-16">
        <div className="container text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">All Products</h1>
          <p className="text-white/80">Premium streetwear for everyday confidence</p>
        </div>
      </div>

      {/* Products */}
      <div className="container py-8 md:py-12">
        <AllProductsGrid />
      </div>
    </main>
  );
}
