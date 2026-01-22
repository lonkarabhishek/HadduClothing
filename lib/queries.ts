// To print all the products from the shopify 
// lib/queries.ts
export const PRODUCTS_QUERY = `
  query Products {
    products(first: 20) {
      nodes {
        id
        title
        handle

        featuredImage {
          url
        }

        images(first: 1) {
          nodes {
            url
          }
        }

        priceRange {
          minVariantPrice {
            amount
          }
        }

        variants(first: 10) {
          nodes {
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;




// ✅ LATEST 4 PRODUCTS (NEW ARRIVALS)
export const LATEST_PRODUCTS_QUERY = `
  query LatestProducts {
    products(
      first: 4
      sortKey: CREATED_AT
      reverse: true
    ) {
      nodes {
        id
        title
        handle

        featuredImage {
          url
        }

        images(first: 1) {
          nodes {
            url
          }
        }

        priceRange {
          minVariantPrice {
            amount
          }
        }

        variants(first: 10) {
          nodes {
            selectedOptions {
              name
              value
            }
          }
        }
      }
    }
  }
`;


// collections (category)


export const COLLECTIONS_QUERY = `
  query Collections {
    collections(first: 10) {
      nodes {
        id
        title
        handle
        description
        image {
          url
        }
      }
    }
  }
`;



// Create cart
export const CREATE_CART_MUTATION = `
  mutation CreateCart {
    cartCreate {
      cart {
        id
        totalQuantity
      }
    }
  }
`;

// Add to cart
export const ADD_TO_CART_MUTATION = `
  mutation AddToCart($cartId: ID!, $variantId: ID!) {
    cartLinesAdd(
      cartId: $cartId
      lines: [{ merchandiseId: $variantId, quantity: 1 }]
    ) {
      cart {
        id
        totalQuantity
      }
    }
  }
`;
