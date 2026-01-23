const SHOPIFY_DOMAIN = process.env.NEXT_PUBLIC_SHOPIFY_DOMAIN;
const SHOPIFY_TOKEN = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN;

const SHOPIFY_ENDPOINT = SHOPIFY_DOMAIN
  ? `https://${SHOPIFY_DOMAIN}/api/2024-01/graphql.json`
  : null;

export const isShopifyConfigured = Boolean(SHOPIFY_DOMAIN && SHOPIFY_TOKEN);

export async function shopifyFetch(query: string, variables = {}) {
  if (!isShopifyConfigured || !SHOPIFY_ENDPOINT) {
    console.warn("Shopify not configured");
    return null;
  }

  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": SHOPIFY_TOKEN!,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 }, // Cache for 60 seconds for speed
  });

  if (!res.ok) {
    console.error("Shopify API error:", res.status);
    return null;
  }

  return res.json();
}
