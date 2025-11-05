import { BASE_URL } from "./app-constants";

// Products URL
const BASE_PRODUCTS = `${BASE_URL}/products`;

export const PRODUCTS_URLS = {
  getProductsList: (skip: number = 0, limit: number = 10): string =>
    `${BASE_PRODUCTS}?skip=${skip}&limit=${limit}`,
  getProductDetails: (id: string | number): string => `${BASE_PRODUCTS}/${id}`,
  addProduct: `${BASE_PRODUCTS}/add`,
  updateProduct: (id: string | number): string => `${BASE_PRODUCTS}/${id}`,
  deleteProduct: (id: string | number): string => `${BASE_PRODUCTS}/${id}`,
  searchProducts: (query: string, skip: number = 0, limit: number = 10): string =>
    `${BASE_PRODUCTS}/search?q=${encodeURIComponent(query)}&skip=${skip}&limit=${limit}`,
};