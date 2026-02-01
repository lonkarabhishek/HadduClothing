"use client";

import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

type ShopifyProductNode = {
  id: string;
  handle: string;
  title: string;
  featuredImage?: { url: string; altText?: string };
  images?: { nodes: { url: string; altText?: string }[] };
  priceRange?: {
    minVariantPrice?: { amount: string; currencyCode: string };
  };
  compareAtPriceRange?: {
    minVariantPrice?: { amount: string; currencyCode: string };
  };
  variants?: {
    nodes: {
      id: string;
      availableForSale: boolean;
      selectedOptions: { name: string; value: string }[];
    }[];
  };
  options?: { name: string; values: string[] }[];
  tags?: string[];
};

type Props = {
  products: ShopifyProductNode[];
};

export default function CollectionProductsGrid({ products }: Props) {
  if (products.length === 0) {
    return (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-lg">No products in this collection yet.</p>
      </div>
    );
  }

  // Expand products by color variants
  const formattedProducts: Product[] = [];

  products.forEach((node) => {
    const sizes: string[] =
      node.options?.find((opt) => opt.name === "Size")?.values || [];
    const colors: string[] =
      node.options?.find((opt) => opt.name.toLowerCase() === "color")?.values || [];

    const comparePrice = node.compareAtPriceRange?.minVariantPrice?.amount;
    const price = Number(node.priceRange?.minVariantPrice?.amount ?? 0);
    const hasDiscount = comparePrice && Number(comparePrice) > price;
    const discountPercent = hasDiscount
      ? Math.round(((Number(comparePrice) - price) / Number(comparePrice)) * 100)
      : 0;

    let tag: string | undefined;
    if (node.tags?.includes("bestseller") || node.tags?.includes("Bestseller")) {
      tag = "Bestseller";
    } else if (node.tags?.includes("new") || node.tags?.includes("New")) {
      tag = "New";
    } else if (hasDiscount && discountPercent >= 10) {
      tag = `${discountPercent}% OFF`;
    }

    // If product has multiple colors, create a card for each color
    if (colors.length > 1) {
      colors.forEach((color: string) => {
        // Find ALL variants with this color to get their images
        const variantsWithColor = node.variants?.nodes?.filter((v) =>
          v.selectedOptions?.some((opt) =>
            opt.name.toLowerCase() === "color" && opt.value === color
          )
        ) || [];

        // Collect all unique images for this color
        const colorImages: string[] = [];
        variantsWithColor.forEach((v: any) => {
          if (v.image?.url && !colorImages.includes(v.image.url)) {
            colorImages.push(v.image.url);
          }
        });

        // If no variant images, use product images as fallback
        const fallbackImage = node.featuredImage?.url || node.images?.nodes?.[0]?.url || "";
        const allImages = colorImages.length > 0 ? colorImages : [fallbackImage].filter(Boolean);

        formattedProducts.push({
          id: `${node.id}-${color}`,
          handle: node.handle,
          title: `${node.title} - ${color}`,
          tag,
          image: allImages[0] || fallbackImage,
          images: allImages,
          hoverImage: allImages[1] || undefined,
          price,
          originalPrice: hasDiscount ? Number(comparePrice) : undefined,
          discount: hasDiscount ? `${discountPercent}% OFF` : undefined,
          sizes,
          href: `/products/${node.handle}?color=${encodeURIComponent(color)}`,
          variantId: variantsWithColor[0]?.id || node.variants?.nodes?.[0]?.id,
          availableForSale: variantsWithColor[0]?.availableForSale ?? true,
        });
      });
    } else {
      // Single color or no color - show as single product
      const firstVariant = node.variants?.nodes?.[0];
      formattedProducts.push({
        id: node.id,
        handle: node.handle,
        title: node.title,
        tag,
        image: node.featuredImage?.url || node.images?.nodes?.[0]?.url || "",
        images: node.images?.nodes?.map((img) => img.url).filter(Boolean) || [],
        hoverImage: node.images?.nodes?.[1]?.url,
        price,
        originalPrice: hasDiscount ? Number(comparePrice) : undefined,
        discount: hasDiscount ? `${discountPercent}% OFF` : undefined,
        sizes,
        colors: [], // Don't show color swatches on collection pages
        href: `/products/${node.handle}`,
        variantId: firstVariant?.id,
        availableForSale: firstVariant?.availableForSale ?? true,
      });
    }
  });

  return (
    <div className="product-grid">
      {formattedProducts.map((product, i) => (
        <ProductCard key={product.id} product={product} priority={i < 4} />
      ))}
    </div>
  );
}
