import { notFound } from "next/navigation";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTION_BY_HANDLE_QUERY } from "@/lib/queries";
import CollectionProductsGrid from "@/components/collections/CollectionProductsGrid";

type Props = {
  params: Promise<{ handle: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { handle } = await params;

  try {
    const res = await shopifyFetch(COLLECTION_BY_HANDLE_QUERY, { handle });
    const collection = res?.data?.collection;

    if (!collection) {
      return { title: "Collection Not Found" };
    }

    return {
      title: `${collection.title} | Haddu Clothing`,
      description: collection.description || `Shop our ${collection.title} collection.`,
    };
  } catch {
    return { title: "Collection | Haddu Clothing" };
  }
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;

  // Redirect "all" to the all products page
  if (handle === "all") {
    return notFound();
  }

  let collection;
  try {
    const res = await shopifyFetch(COLLECTION_BY_HANDLE_QUERY, { handle });
    collection = res?.data?.collection;
  } catch (error) {
    console.error("Error fetching collection:", error);
    return notFound();
  }

  if (!collection) {
    return notFound();
  }

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Collection Header - minimal */}
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
          {collection.title}
        </h1>
      </div>

      {/* Products Grid */}
      <div className="container" style={{ padding: '24px 16px 60px' }}>
        <CollectionProductsGrid products={collection.products.nodes} />
      </div>
    </main>
  );
}
