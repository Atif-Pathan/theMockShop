const BASE_URL = 'https://api.escuelajs.co/api/v1';

const getAllProducts = async () => {
  const url = `${BASE_URL}/products`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    const filteredData = data.filter((item) => item.id < 52); // the first 51 objects are good, the rest are other people adding in random objects
    return filteredData;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// use this to get a single product details through a slug
const getProductBySlug = async (slug) => {
  const url = `${BASE_URL}/products/slug/${slug}`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// gets all other products in the same category as the current product
const getRelatedProductsBySlug = async (slug) => {
  const url = `${BASE_URL}/products/slug/${slug}/related`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

export { getAllProducts, getProductBySlug, getRelatedProductsBySlug };
