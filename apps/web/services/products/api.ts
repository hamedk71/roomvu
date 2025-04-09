import apiClient from '../api/axios';
import { Product } from './types';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

export const ProductsApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(`${BASE_URL}/products`);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`${BASE_URL}/products/${id}`);
    return response.data;
  }
}; 