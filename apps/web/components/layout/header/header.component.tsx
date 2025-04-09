"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Button, CartIcon, MenuIcon, CloseIcon } from "@repo/ui";

import { HeaderProps } from "./header.types";
import { mainNavLinks } from "../../../constants/navlinks";

import "./header.style.scss";

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
    <header className="header">
      <div className="container">
        <div className="header__container">
          <div className="header__nav-container">
            <Link href="/" className="header__logo">
              <Image src="/logo.svg" alt="Shop" width={120} height={60} />
            </Link>

            <nav className="header__nav">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`header__link ${item.isActive ? "header__link--active" : ""}`}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="header__actions">
            <button
              className="header__cart"
              aria-label="Shopping cart"
              onClick={onCartClick}
            >
              <CartIcon />
              {cartItemsCount > 0 && (
                <span className="header__cart-count">{cartItemsCount}</span>
              )}
            </button>

            <Button variant="primary" size="sm" className="header__auth-button">
              Login / Register
            </Button>

            <button
              className="header__mobile-toggle"
              aria-label="Toggle mobile menu"
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      <div
        className={`header__mobile-menu ${mobileMenuOpen ? "header__mobile-menu--open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`header__link ${item.isActive ? "header__link--active" : ""}`}
            onClick={() => setMobileMenuOpen(false)}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </header>
  );
}
