export interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  currency?: string;
  discount?: number;
  isNew?: boolean;
}

export interface ProductCardProps {
  product: Product;
  onAddToCart?: () => void;
  onProductClick?: () => void;
} 