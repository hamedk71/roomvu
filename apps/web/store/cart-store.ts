import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '../services/products/types';

interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalItems: number;
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set) => ({
      items: [],
      totalItems: 0,
      
      addToCart: (product: Product) => {
        set((state) => {
          const existingItem = state.items.find(item => item.product.id === product.id);
          
          if (existingItem) {
            // If item exists and quantity is less than 5, increase quantity
            if (existingItem.quantity < 5) {
              const updatedItems = state.items.map(item => 
                item.product.id === product.id 
                  ? { ...item, quantity: item.quantity + 1 } 
                  : item
              );
              
              return {
                items: updatedItems,
                totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
              };
            }
            // If already at max quantity, return state unchanged
            return state;
          } else {
            // Add new item with quantity 1
            const newItems = [...state.items, { product, quantity: 1 }];
            return {
              items: newItems,
              totalItems: newItems.reduce((total, item) => total + item.quantity, 0)
            };
          }
        });
      },
      
      removeFromCart: (productId: number) => {
        set((state) => {
          const filteredItems = state.items.filter(item => item.product.id !== productId);
          return {
            items: filteredItems,
            totalItems: filteredItems.reduce((total, item) => total + item.quantity, 0)
          };
        });
      },
      
      increaseQuantity: (productId: number) => {
        set((state) => {
          const updatedItems = state.items.map(item => {
            if (item.product.id === productId && item.quantity < 5) {
              return { ...item, quantity: item.quantity + 1 };
            }
            return item;
          });
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
          };
        });
      },
      
      decreaseQuantity: (productId: number) => {
        set((state) => {
          const updatedItems = state.items.map(item => {
            if (item.product.id === productId && item.quantity > 1) {
              return { ...item, quantity: item.quantity - 1 };
            }
            return item;
          });
          
          return {
            items: updatedItems,
            totalItems: updatedItems.reduce((total, item) => total + item.quantity, 0)
          };
        });
      },
      
      clearCart: () => {
        set({ items: [], totalItems: 0 });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
); 