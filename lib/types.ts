// Shared TypeScript types for Shopify integration

export type ShopifyImage = {
  url: string;
  altText?: string;
  width?: number;
  height?: number;
};

export type ShopifyMoney = {
  amount: string;
  currencyCode: string;
};

export type ShopifyProductVariant = {
  id: string;
  title: string;
  availableForSale: boolean;
  quantityAvailable?: number;
  price: ShopifyMoney;
  compareAtPrice?: ShopifyMoney;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ShopifyImage;
};

export type ShopifyProduct = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  featuredImage?: ShopifyImage;
  images: {
    nodes: ShopifyImage[];
  };
  priceRange: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  compareAtPriceRange?: {
    minVariantPrice: ShopifyMoney;
    maxVariantPrice: ShopifyMoney;
  };
  variants: {
    nodes: ShopifyProductVariant[];
  };
  options: {
    name: string;
    values: string[];
  }[];
  tags: string[];
  vendor: string;
};

export type CartLineItem = {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    product: {
      id: string;
      handle: string;
      title: string;
      featuredImage?: ShopifyImage;
    };
    price: ShopifyMoney;
    selectedOptions: {
      name: string;
      value: string;
    }[];
    image?: ShopifyImage;
  };
  cost: {
    totalAmount: ShopifyMoney;
  };
};

export type ShopifyCart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: {
    subtotalAmount: ShopifyMoney;
    totalAmount: ShopifyMoney;
    totalTaxAmount?: ShopifyMoney;
  };
  lines: {
    nodes: CartLineItem[];
  };
};

// Frontend-friendly product type for cards and listings
export type Product = {
  id: string;
  handle: string;
  title: string;
  tag?: string;
  image: string;
  images?: string[];
  hoverImage?: string;
  price: number;
  originalPrice?: number;
  discount?: string;
  sizes: string[];
  href: string;
  variantId?: string;
  availableForSale?: boolean;
};

// Product detail type with full information
export type ProductDetail = {
  id: string;
  handle: string;
  title: string;
  description: string;
  descriptionHtml: string;
  images: ShopifyImage[];
  price: number;
  compareAtPrice?: number;
  currencyCode: string;
  variants: {
    id: string;
    title: string;
    availableForSale: boolean;
    price: number;
    compareAtPrice?: number;
    selectedOptions: { name: string; value: string }[];
    image?: ShopifyImage;
  }[];
  options: {
    name: string;
    values: string[];
  }[];
  tags: string[];
  vendor: string;
};
