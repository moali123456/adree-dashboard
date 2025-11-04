import { BASE_URL } from "./app-constants";

// Products URL
const BASE_PRODUCTS = `${BASE_URL}/products`;

export const PRODUCTS_URLS = {
  getProductsList: (skip = 0, limit = 10) =>
    `${BASE_PRODUCTS}?skip=${skip}&limit=${limit}`,
  getProductDetails: (id) => `${BASE_PRODUCTS}/${id}`,
  addProduct: `${BASE_PRODUCTS}/add`,
  updateProduct: (id) => `${BASE_PRODUCTS}/${id}`,
  deleteProduct: (id) => `${BASE_PRODUCTS}/${id}`,
  searchProducts: (query, skip = 0, limit = 10) =>
    `${BASE_PRODUCTS}/search?q=${query}&skip=${skip}&limit=${limit}`,
};
