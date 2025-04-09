"use client";

import Image from "next/image";
import { CartIcon } from "@repo/ui";
import { ProductCardProps } from "./product-card.types";
import styles from "./product-card.module.scss";

export function ProductCard({ product, onAddToCart, onProductClick }: ProductCardProps) {
  const {
    name,
    price,
    image,
    currency = "$",
    discount,
    isNew,
  } = product;

  const hasDiscount = discount && discount > 0;
  const originalPrice = hasDiscount ? price / (1 - discount / 100) : 0;
  const formattedPrice = price.toFixed(2);
  const formattedOriginalPrice = originalPrice.toFixed(2);

  const handleCardClick = () => {
    if (onProductClick) {
      onProductClick();
    }
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart();
    }
  };

  return (
    <div className={styles.card} onClick={handleCardClick}>
      {/* Badges */}
      {hasDiscount && (
        <div className={`${styles.card_badge} ${styles.card_badge_discount}`}>
          -{discount}%
        </div>
      )}
      
      {isNew && !hasDiscount && (
        <div className={`${styles.card_badge} ${styles.card_badge_new}`}>
          New
        </div>
      )}

      {/* Image */}
      <div className={styles.card_image_container}>
        <Image 
          src={image} 
          alt={name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority
        />
      </div>

      {/* Content */}
      <div className={styles.card_content}>
        <h3 className={styles.card_name}>{name}</h3>
        
        <div className={styles.card_price_container}>
          <span className={styles.card_price}>
            {currency}{formattedPrice}
          </span>
          
          {hasDiscount && (
            <span className={styles.card_original_price}>
              {currency}{formattedOriginalPrice}
            </span>
          )}
        </div>
      </div>

      {/* Add to cart button */}
      <button 
        className={styles.card_add_to_cart}
        onClick={handleAddToCart}
        aria-label="Add to cart"
      >
        <CartIcon size={20} />
      </button>
    </div>
  );
} 