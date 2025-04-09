"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";

import { Button, CartIcon, MenuIcon, CloseIcon } from "@repo/ui";

import { mainNavLinks } from "../../../constants/navlinks";
import { useCartStore } from "../../../store/cart-store";

import { HeaderProps } from "./header.types";

import styles from "./header.module.scss";

export function Header({
  navItems = mainNavLinks,
}: Omit<HeaderProps, 'cartItemsCount' | 'onCartClick'>) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems } = useCartStore();
  const router = useRouter();
  const pathname = usePathname();

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const handleCartClick = () => {
    router.push('/cart');
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.header__container}>
          <div className={styles.header__nav_container}>
            <Link href="/" className={styles.header__logo}>
              <Image src="/logo.svg" alt="Shop" width={120} height={60} />
            </Link>

            <nav className={styles.header__nav}>
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`${styles.header__link} ${
                    (pathname === item.href) || 
                    (item.href !== '/' && pathname.startsWith(item.href))
                      ? styles.header__link_active
                      : ""
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className={styles.header__actions}>
            <button
              className={styles.header__cart}
              aria-label="Shopping cart"
              onClick={handleCartClick}
            >
              <CartIcon />
              {totalItems > 0 && (
                <span className={styles.header__cart_count}>{totalItems}</span>
              )}
            </button>

            <Button variant="primary" size="sm" className={styles.header__auth_button}>
              Login / Register
            </Button>

            <button
              className={styles.header__mobile_toggle}
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.header__mobile_menu} ${mobileMenuOpen ? styles.header__mobile_menu_open : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`${styles.header__link} ${
              (pathname === item.href) || 
              (item.href !== '/' && pathname.startsWith(item.href))
                ? styles.header__link_active
                : ""
            }`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
