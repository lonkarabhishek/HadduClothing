import { notFound } from "next/navigation";
import { Metadata } from "next";
import { shopifyFetch } from "@/lib/shopify";
import { PRODUCT_BY_HANDLE_QUERY } from "@/lib/queries";
import ProductDetail from "@/components/product/ProductDetail";
import type { ProductDetail as ProductDetailType } from "@/lib/types";

type Props = {
  params: Promise<{ handle: string }>;
};

// Transform Shopify response to our ProductDetail type
function transformProduct(product: any): ProductDetailType {
  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    images: product.images.nodes,
    price: parseFloat(product.priceRange.minVariantPrice.amount),
    compareAtPrice: product.compareAtPriceRange?.minVariantPrice?.amount &&
      parseFloat(product.compareAtPriceRange.minVariantPrice.amount) > 0
      ? parseFloat(product.compareAtPriceRange.minVariantPrice.amount)
      : undefined,
    currencyCode: product.priceRange.minVariantPrice.currencyCode,
    variants: product.variants.nodes.map((v: any) => ({
      id: v.id,
      title: v.title,
      availableForSale: v.availableForSale,
      price: parseFloat(v.price.amount),
      compareAtPrice: v.compareAtPrice?.amount &&
        parseFloat(v.compareAtPrice.amount) > 0
        ? parseFloat(v.compareAtPrice.amount)
        : undefined,
      selectedOptions: v.selectedOptions,
      image: v.image,
    })),
    options: product.options,
    tags: product.tags,
    vendor: product.vendor,
  };
}

async function getProduct(handle: string): Promise<ProductDetailType | null> {
  try {
    const res = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
    if (!res.data?.product) return null;
    return transformProduct(res.data.product);
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    return {
      title: "Product Not Found | Haddu Clothing",
    };
  }

  return {
    title: `${product.title} | Haddu Clothing`,
    description: product.description.slice(0, 160),
    openGraph: {
      title: product.title,
      description: product.description.slice(0, 160),
      images: product.images[0]?.url ? [product.images[0].url] : [],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await getProduct(handle);

  if (!product) {
    notFound();
  }

  return (
    <main className="min-h-screen">
      <ProductDetail product={product} />
    </main>
  );
}
