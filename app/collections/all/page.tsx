import AllProductsGrid from "@/components/collections/AllProductsGrid";
import CollectionFilters from "@/components/collections/CollectionFilters";
import CollectionSort from "@/components/collections/CollectionSort";


export const metadata = {
    title: "All Products | Haddu",
    description:
        "Explore the complete Haddu collection. Timeless silhouettes, elevated fabrics.",
};

export default function AllCollectionsPage() {
    return (
        <main className="px-5 md:px-10 pt-20 pb-28 max-w-[1600px] mx-auto">
            {/* HEADER */}
            <header className="mb-12 md:mb-16 text-center max-w-2xl mx-auto">
                <h1 className="text-3xl md:text-5xl font-light tracking-[0.3em] uppercase">
                    All Products
                </h1>
                <p className="mt-5 text-xs md:text-sm text-gray-500 tracking-wide">
                    Discover every piece from the Haddu wardrobe — crafted for modern
                    silhouettes.
                </p>
            </header>

            {/* TOOLBAR */}
            <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                <CollectionFilters />
                <CollectionSort />
            </div>

            {/* GRID */}
            <AllProductsGrid />
        </main>
    );
}
