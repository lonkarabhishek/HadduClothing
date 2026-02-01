import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import { COLLECTIONS_QUERY } from "@/lib/queries";

export const metadata = {
  title: "Collections | Haddu Clothing",
  description: "Browse all our collections. Premium streetwear designed for everyday confidence.",
};

type Collection = {
  id: string;
  title: string;
  handle: string;
  description?: string;
  image?: { url: string; altText?: string };
  products: { nodes: { featuredImage?: { url: string } }[] };
};

export default async function CollectionsPage() {
  let collections: Collection[] = [];

  try {
    const res = await shopifyFetch(COLLECTIONS_QUERY, { first: 20 });
    collections = res?.data?.collections?.nodes || [];
  } catch (error) {
    console.error("Error fetching collections:", error);
  }

  // Filter out empty collections and "all" if it exists
  const visibleCollections = collections.filter(
    (c) => c.handle !== "all" && (c.image?.url || c.products.nodes[0]?.featuredImage?.url)
  );

  return (
    <main style={{ minHeight: '100vh', backgroundColor: '#fafafa' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#3f5046',
        color: 'white',
        padding: '40px 24px 48px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Decorative elements */}
        <div style={{
          position: 'absolute',
          top: '-20px',
          left: '10%',
          width: '120px',
          height: '120px',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '50%'
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-40px',
          right: '15%',
          width: '100px',
          height: '100px',
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
          fontSize: 'clamp(28px, 5vw, 40px)',
          fontWeight: '600',
          letterSpacing: '-0.02em',
          position: 'relative'
        }}>
          Our Collections
        </h1>
        <p style={{
          fontSize: '15px',
          color: 'rgba(255,255,255,0.7)',
          marginTop: '12px',
          maxWidth: '500px',
          marginLeft: 'auto',
          marginRight: 'auto'
        }}>
          Discover our curated collections of premium streetwear
        </p>
        <div style={{
          width: '40px',
          height: '2px',
          backgroundColor: 'rgba(255,255,255,0.3)',
          margin: '20px auto 0'
        }} />
      </div>

      {/* Collections Grid */}
      <div className="container" style={{ padding: '40px 16px 80px' }}>
        {visibleCollections.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: '#666', fontSize: '16px' }}>No collections available yet.</p>
            <Link
              href="/collections/all"
              style={{
                display: 'inline-block',
                marginTop: '20px',
                padding: '12px 24px',
                backgroundColor: '#3f5046',
                color: 'white',
                borderRadius: '8px',
                fontWeight: '500',
                textDecoration: 'none'
              }}
            >
              Browse All Products
            </Link>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '24px'
          }}>
            {visibleCollections.map((collection) => {
              const imageUrl = collection.image?.url || collection.products.nodes[0]?.featuredImage?.url;

              return (
                <Link
                  key={collection.id}
                  href={`/collections/${collection.handle}`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    aspectRatio: '4/5',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    textDecoration: 'none',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'transform 0.3s ease, box-shadow 0.3s ease'
                  }}
                  className="collection-card"
                >
                  {/* Background Image */}
                  {imageUrl && (
                    <img
                      src={`${imageUrl}&width=600`}
                      alt={collection.image?.altText || collection.title}
                      style={{
                        position: 'absolute',
                        inset: 0,
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.4s ease'
                      }}
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.2) 50%, rgba(0,0,0,0.1) 100%)'
                  }} />

                  {/* Content */}
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: '24px',
                    color: 'white'
                  }}>
                    <h2 style={{
                      fontSize: '22px',
                      fontWeight: '600',
                      marginBottom: '8px',
                      letterSpacing: '-0.01em'
                    }}>
                      {collection.title}
                    </h2>
                    {collection.description && (
                      <p style={{
                        fontSize: '14px',
                        color: 'rgba(255,255,255,0.8)',
                        lineHeight: '1.5',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>
                        {collection.description}
                      </p>
                    )}
                    <div style={{
                      marginTop: '16px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      fontSize: '13px',
                      fontWeight: '500',
                      color: 'rgba(255,255,255,0.9)'
                    }}>
                      Shop Now
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}

            {/* View All Products Card */}
            <Link
              href="/collections/all"
              style={{
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                aspectRatio: '4/5',
                borderRadius: '16px',
                overflow: 'hidden',
                textDecoration: 'none',
                backgroundColor: '#3f5046',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              className="collection-card"
            >
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                border: '2px solid rgba(255,255,255,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px'
              }}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="3" y="3" width="7" height="7" rx="1" />
                  <rect x="14" y="3" width="7" height="7" rx="1" />
                  <rect x="3" y="14" width="7" height="7" rx="1" />
                  <rect x="14" y="14" width="7" height="7" rx="1" />
                </svg>
              </div>
              <h2 style={{
                fontSize: '20px',
                fontWeight: '600',
                color: 'white',
                marginBottom: '8px'
              }}>
                All Products
              </h2>
              <p style={{
                fontSize: '14px',
                color: 'rgba(255,255,255,0.7)'
              }}>
                Browse our complete catalog
              </p>
            </Link>
          </div>
        )}
      </div>

      {/* Add hover styles via global CSS-in-JS */}
      <style>{`
        .collection-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 40px rgba(0,0,0,0.15);
        }
        .collection-card:hover img {
          transform: scale(1.05);
        }
      `}</style>
    </main>
  );
}
