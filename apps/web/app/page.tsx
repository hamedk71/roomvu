"use client";

import { useState } from "react";
import { ProductCard, Product } from "../components/common/card";
import styles from "./page.module.scss";

// Sample product data
const sampleProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 249.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000",
    discount: 15,
    currency: "$"
  },
  {
    id: "2",
    name: "Smart Watch Series 7",
    price: 399.99,
    image: "https://images.unsplash.com/photo-1546868871-7041f2a55e12?q=80&w=1000",
    isNew: true,
    currency: "$"
  },
  {
    id: "3",
    name: "Ergonomic Office Chair",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?q=80&w=1000",
    currency: "$"
  },
  {
    id: "4",
    name: "Ultra HD Smart TV 55\"",
    price: 699.99,
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?q=80&w=1000",
    discount: 10,
    currency: "$"
  },
  {
    id: "5",
    name: "Portable Bluetooth Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000",
    currency: "$"
  },
  {
    id: "6",
    name: "Professional DSLR Camera",
    price: 1299.99,
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000",
    isNew: true,
    currency: "$"
  }
];

export default function Home() {
  const [products] = useState<Product[]>(sampleProducts);
  
  const handleAddToCart = (productId: string) => {
    console.log(`Added product ${productId} to cart`);
    // Implement cart functionality here
  };
  
  const handleProductClick = (productId: string) => {
    console.log(`Navigating to product ${productId} detail page`);
    // Implement navigation to product detail page
  };
  
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className="container">
          <h1 className={styles.title}>Featured Products</h1>
          
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <div key={product.id} className={styles.productCard}>
                <ProductCard
                  product={product}
                  onAddToCart={() => handleAddToCart(product.id)}
                  onProductClick={() => handleProductClick(product.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
