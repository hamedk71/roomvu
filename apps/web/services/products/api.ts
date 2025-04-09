import apiClient from '../api/axios';
import { Product } from './types';

const BASE_URL = 'https://fakestoreapi.com/products';

export const ProductsApi = {
  getProducts: async (): Promise<Product[]> => {
    const response = await apiClient.get<Product[]>(BASE_URL);
    return response.data;
  },

  getProductById: async (id: number): Promise<Product> => {
    const response = await apiClient.get<Product>(`${BASE_URL}/${id}`);
    return response.data;
  }
}; 