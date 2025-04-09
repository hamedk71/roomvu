"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, CartIcon, MenuIcon, CloseIcon } from "@repo/ui";

import { HeaderProps } from "./header.types";
import { mainNavLinks } from "../../../constants/navlinks";

import styles from "./header.module.scss";

export function Header({
  cartItemsCount = 0,
  onCartClick,
  navItems = mainNavLinks,
}: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
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
                  className={`${styles.header__link} ${item.isActive ? styles.header__link_active : ""}`}
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
              onClick={onCartClick}
            >
              <CartIcon />
              {cartItemsCount > 0 && (
                <span className={styles.header__cart_count}>{cartItemsCount}</span>
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
            className={`${styles.header__link} ${item.isActive ? styles.header__link_active : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
