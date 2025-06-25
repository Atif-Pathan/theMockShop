// const BASE_URL = 'https://api.escuelajs.co/api/v1';

// const getAllProducts = async () => {
//   const url = `${BASE_URL}/products`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const data = await response.json();
//     // const filteredData = data.filter((item) => item.id > 60); // the first 51 objects are good, the rest are other people adding in random objects
//     return data;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };

// // use this to get a single product details through a slug
// const getProductBySlug = async (slug) => {
//   const url = `${BASE_URL}/products/slug/${slug}`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };

// // gets all other products in the same category as the current product
// const getRelatedProductsBySlug = async (slug) => {
//   const url = `${BASE_URL}/products/slug/${slug}/related`;
//   try {
//     const response = await fetch(url);
//     if (!response.ok) {
//       throw new Error(`Response status: ${response.status}`);
//     }
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.error('API call failed:', error);
//     throw error;
//   }
// };

// export { getAllProducts, getProductBySlug, getRelatedProductsBySlug };

// NEW MOCK API INSTEAD due to platzi fake store api being public and constantly being changed
// This api will just use the local stored item objects in the products.js file instead
// The goal is to now simulate the api request instead. Although we do know that the actual
// api works and I already built this whoe thing using it. But its not viable since the data
// is subject to change:

import { allProducts } from '../data/products.js';

// A helper function to simulate the delay of a real network request.
// This is important for testing loading states and for ensuring
// our components behave correctly with async data.
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * MOCKED API: Gets all products from our local data file.
 */
export const getAllProducts = async () => {
  await sleep(150); // Simulate a short network delay
  return allProducts;
};

/**
 * MOCKED API: Finds a single product by its slug.
 */
export const getProductBySlug = async (slug) => {
  await sleep(150);

  const product = allProducts.find((p) => p.slug === slug);

  // If no product is found, we throw an error that mimics a
  // "404 Not Found" response. This allows our ErrorPage to work correctly.
  if (!product) {
    throw new Response('Product Not Found', { status: 404 });
  }

  return product;
};

/**
 * MOCKED API: Finds related products based on category.
 */
export const getRelatedProductsBySlug = async (slug) => {
  await sleep(150);

  const currentProduct = allProducts.find((p) => p.slug === slug);

  if (!currentProduct) {
    throw new Response('Product Not Found', { status: 404 });
  }

  // Filter for products in the same category, but exclude the current product itself.
  const related = allProducts.filter(
    (p) =>
      p.category.id === currentProduct.category.id &&
      p.id !== currentProduct.id,
  );

  // Return the first 4 related products for a clean UI.
  return related;
};
