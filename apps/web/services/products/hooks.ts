"use client";

import { useState, useEffect, useCallback } from "react";
import { ProductsApi } from "./api";
import { Product } from "./types";

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProductsApi.getProducts();
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch products"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(id: number) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const data = await ProductsApi.getProductById(id);
      setProduct(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(`Failed to fetch product with id ${id}`));
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}

export function useInfiniteProducts(itemsPerPage = 6) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);
  
  useEffect(() => {
    async function fetchInitialProducts() {
      try {
        setLoading(true);
        
        const allProducts = await ProductsApi.getProducts();
        setTotalProducts(allProducts.length);
        
        setProducts(allProducts.slice(0, itemsPerPage));
        
        setHasMore(allProducts.length > itemsPerPage);
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Failed to fetch products"));
      } finally {
        setLoading(false);
      }
    }
    
    fetchInitialProducts();
  }, [itemsPerPage]);
  
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    
    try {
      setLoading(true);
      
      const nextPage = page + 1;
      const startIndex = (nextPage - 1) * itemsPerPage;
      
      const allProducts = await ProductsApi.getProducts();
      const nextPageProducts = allProducts.slice(0, startIndex + itemsPerPage);
      
      setProducts(nextPageProducts);
      setPage(nextPage);
      setHasMore(nextPageProducts.length < totalProducts);
      
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to load more products"));
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, page, itemsPerPage, totalProducts]);
  
  return {
    products,
    loading,
    error,
    hasMore,
    loadMore
  };
}
