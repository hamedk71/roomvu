'use client';

import React, { useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

import { useInfiniteProducts } from '../../services/products/hooks';
import { Product } from '../../services/products/types';

import { useCartStore } from '../../store/cart-store';

import styles from './products.module.scss';

export default function ProductsPage() {
  const { products, loading, error, hasMore, loadMore } = useInfiniteProducts();
  const observerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { addToCart, items } = useCartStore();
  
  useEffect(() => {
    if (loading || !hasMore) return;
    
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && hasMore) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );
    
    const currentObserverRef = observerRef.current;
    
    if (currentObserverRef) {
      observer.observe(currentObserverRef);
    }
    
    return () => {
      if (currentObserverRef) {
        observer.unobserve(currentObserverRef);
      }
    };
  }, [loading, hasMore, loadMore]);
  
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    e.stopPropagation();
    
    const existingItem = items.find(item => item.product.id === product.id);
    
    if (existingItem && existingItem.quantity >= 5) {
      toast.warning(`Maximum quantity (5) reached for ${product.title}`);
      return;
    }
    
    addToCart(product);
    toast.success(`Added ${product.title} to cart`);
  };
  
  const handleProductClick = (product: Product) => {
    router.push(`/products/${product.id}`);
  };
  
  if (error) {
    return (
      <main className="container">
        <h1 className={styles.title}>Products</h1>
        <div className={styles.error}>
          <p>Failed to load products. Please try again later.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <h1 className={styles.title}>Products</h1>
      
      {loading && products.length === 0 ? (
        <div className={styles.loading}>
          <p>Loading products...</p>
        </div>
      ) : (
        <>
          {products.length === 0 ? (
            <div className={styles.error}>
              <p>No products found.</p>
            </div>
          ) : (
            <div className={styles.productsGrid}>
              {products.map((product) => (
                <div 
                  key={product.id} 
                  className={styles.productCard}
                  onClick={() => handleProductClick(product)}
                >
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
                          onClick={(e) => handleAddToCart(product, e)}
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div ref={observerRef} className={styles.loaderContainer}>
            {loading && products.length > 0 && (
              <div className={styles.loader}>
                <p>Loading more products...</p>
              </div>
            )}
            
            {!hasMore && products.length > 0 && (
              <div className={styles.endMessage}>
                <p>You&apos;ve reached the end of the products</p>
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
