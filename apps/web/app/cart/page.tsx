'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { useCartStore } from '../../store/cart-store';

import styles from './cart.module.scss';

export default function CartPage() {
  const { items, totalItems, removeFromCart, increaseQuantity, decreaseQuantity } = useCartStore();
  
  if (totalItems === 0) {
    return (
      <main className="container">
        <h1 className={styles.title}>Your Cart</h1>
        <div className={styles.emptyCart}>
          <p>Your cart is empty.</p>
          <Link href="/products" className={styles.continueShoppingBtn}>
            Continue Shopping
          </Link>
        </div>
      </main>
    );
  }

  // Calculate total price
  const totalPrice = items.reduce(
    (total, item) => total + item.product.price * item.quantity, 
    0
  );

  return (
    <main className="container">
      <h1 className={styles.title}>Your Cart</h1>
      
      <div className={styles.cartContainer}>
        <div className={styles.cartItems}>
          {items.map((item) => (
            <div key={item.product.id} className={styles.cartItem}>
              <div className={styles.productImage}>
                <Image 
                  src={item.product.image} 
                  alt={item.product.title}
                  width={80}
                  height={80}
                  objectFit="contain"
                />
              </div>
              
              <div className={styles.productInfo}>
                <h3 className={styles.productTitle}>
                  <Link href={`/products/${item.product.id}`}>
                    {item.product.title}
                  </Link>
                </h3>
                <p className={styles.productCategory}>{item.product.category}</p>
                <span className={styles.productPrice}>${item.product.price.toFixed(2)}</span>
              </div>
              
              <div className={styles.quantityControls}>
                <button 
                  onClick={() => decreaseQuantity(item.product.id)}
                  className={styles.quantityBtn}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className={styles.quantity}>{item.quantity}</span>
                <button 
                  onClick={() => increaseQuantity(item.product.id)}
                  className={styles.quantityBtn}
                  disabled={item.quantity >= 5}
                >
                  +
                </button>
              </div>
              
              <div className={styles.itemTotal}>
                ${(item.product.price * item.quantity).toFixed(2)}
              </div>
              
              <button 
                onClick={() => removeFromCart(item.product.id)}
                className={styles.removeBtn}
                aria-label="Remove item"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
        
        <div className={styles.cartSummary}>
          <h2>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Items ({totalItems}):</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <div className={styles.summaryRow}>
            <span>Shipping:</span>
            <span>Free</span>
          </div>
          
          <div className={`${styles.summaryRow} ${styles.summaryRowTotal}`}>
            <span>Total:</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          
          <button className={styles.checkoutBtn}>
            Proceed to Checkout
          </button>
          
          <Link href="/products" className={styles.continueLink}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </main>
  );
} 