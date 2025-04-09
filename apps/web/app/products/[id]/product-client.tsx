'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Product } from '../../../services/products/types';
import styles from './product.module.scss';

type ProductClientProps = {
  product: Product;
};

export default function ProductClient({ product }: ProductClientProps) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    toast.success(`Added ${quantity} ${product.title} to cart`);
  };

  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1));
  };

  return (
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
  );
} 