export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderProps {
  navItems?: NavItem[];
  cartItemsCount?: number;
  onCartClick?: () => void;
} 