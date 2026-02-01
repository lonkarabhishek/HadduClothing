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
      {/* Collection Header */}
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
          Collection
        </p>
        <h1 style={{
          fontSize: 'clamp(24px, 4vw, 32px)',
          fontWeight: '600',
          letterSpacing: '-0.02em',
          position: 'relative'
        }}>
          {collection.title}
        </h1>
        {collection.description && (
          <p style={{
            fontSize: '14px',
            color: 'rgba(255,255,255,0.7)',
            marginTop: '12px',
            maxWidth: '500px',
            marginLeft: 'auto',
            marginRight: 'auto'
          }}>
            {collection.description}
          </p>
        )}
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          margin: '16px auto 0'
        }} />
      </div>

      {/* Products Grid */}
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
          <span style={{ writingMode: 'vertical-rl', fontSize: '10px', letterSpacing: '0.2em', color: '#bbb', textTransform: 'uppercase' }}>{collection.title}</span>
          <div style={{ width: '1px', flex: 1, background: 'linear-gradient(to bottom, #e0e0e0, transparent)' }} />
        </div>

        <div className="container" style={{ padding: '32px 16px 60px' }}>
          <CollectionProductsGrid products={collection.products.nodes} />
        </div>
      </div>
    </main>
  );
}
