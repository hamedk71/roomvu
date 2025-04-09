export interface NavItem {
  label: string;
  href: string;
  isActive?: boolean;
}

export interface HeaderProps {
  cartItemsCount?: number;
  onCartClick?: () => void;
  navItems?: NavItem[];
} 