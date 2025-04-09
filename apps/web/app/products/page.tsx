'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { toast } from 'react-toastify';
import { ProductsApi } from '../../services/products';
import { Product } from '../../services/products/types';
import styles from './products.module.scss';

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await ProductsApi.getProducts();
        setProducts(data);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddToCart = (product: Product) => {
    toast.info(`Added ${product.title} to cart`);
    console.log(`Added ${product.id} to cart`);
  };

  return (
    <main className="container">
      <h1 className={styles.title}>Products</h1>
      
      {loading && (
        <div className={styles.loading}>
          <p>Loading products...</p>
        </div>
      )}
      
      {!loading && products.length === 0 && (
        <div className={styles.error}>
          <p>No products found. Please try again later.</p>
        </div>
      )}
      
      <div className={styles.productsGrid}>
        {products.map((product) => (
          <div key={product.id} className={styles.productCard}>
            <div className={styles.card}>
              <div className={styles.cardImageContainer}>
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>{product.title}</h3>
                <p className={styles.cardCategory}>{product.category}</p>
                <div className={styles.cardPriceRow}>
                  <span className={styles.cardPrice}>${product.price.toFixed(2)}</span>
                  <button 
                    className={styles.cardButton}
                    onClick={() => handleAddToCart(product)}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
