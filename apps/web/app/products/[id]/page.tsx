'use client';

import React, { useState, use } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { useProduct } from '../../../services/products/hooks';
import { useCartStore } from '../../../store/cart-store';
import styles from './product.module.scss';

type PageParams = {
  id: string;
};

type ProductPageProps = {
  params: Promise<PageParams>;
};

export default function ProductPage({ params }: ProductPageProps) {
  const unwrappedParams = use(params);
  const productId = parseInt(unwrappedParams.id, 10);
  const { product, loading, error } = useProduct(productId);
  const [quantity, setQuantity] = useState(1);
  const { addToCart, items } = useCartStore();

  const handleAddToCart = () => {
    if (product) {
      // Check if item quantity would exceed maximum
      const existingItem = items.find(item => item.product.id === product.id);
      
      if (existingItem && existingItem.quantity + quantity > 5) {
        toast.warning(`Cannot add ${quantity} more. Maximum quantity (5) would be exceeded.`);
        return;
      }
      
      // Add to cart for each quantity
      for (let i = 0; i < quantity; i++) {
        addToCart(product);
      }
      
      toast.success(`Added ${quantity} ${product.title} to cart`);
    }
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  if (loading) {
    return (
      <main className="container">
        <div className={styles.loading}>
          <p>Loading product...</p>
        </div>
      </main>
    );
  }

  if (error || !product) {
    return (
      <main className="container">
        <div className={styles.error}>
          <p>Failed to load product. Please try again later.</p>
          <Link href="/products" className={styles.backLink}>
            Back to Products
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className={styles.breadcrumbs}>
        <Link href="/products">Products</Link> / {product.title}
      </div>
      
      <div className={styles.product}>
        <div className={styles.productImage}>
          <Image
            src={product.image}
            alt={product.title}
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.image}
            priority
          />
        </div>
        
        <div className={styles.productInfo}>
          <h1 className={styles.title}>{product.title}</h1>
          
          <div className={styles.category}>
            <span>Category:</span> {product.category}
          </div>
          
          <div className={styles.price}>
            <span>${product.price.toFixed(2)}</span>
          </div>
          
          <div className={styles.description}>
            <p>{product.description}</p>
          </div>
          
          <div className={styles.actions}>
            <div className={styles.quantity}>
              <button 
                onClick={decrementQuantity}
                className={styles.quantityButton}
                disabled={quantity <= 1}
              >
                -
              </button>
              <span>{quantity}</span>
              <button 
                onClick={incrementQuantity}
                className={styles.quantityButton}
              >
                +
              </button>
            </div>
            
            <button 
              className={styles.addToCartButton}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 