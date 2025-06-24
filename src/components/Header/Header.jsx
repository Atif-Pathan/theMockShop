'use client';

import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

export default function Header({ numberOfItems, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          {/* <span className={styles.logoIcon}>👗</span> */}
          <span className={styles.logoText}>The Wardrobe</span>
        </Link>

        {/* Desktop Navigation */}
        <nav
          className={styles.desktopNav}
          role="navigation"
          aria-label="Main navigation"
        >
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/shop"
            className={({ isActive }) =>
              isActive ? `${styles.navLink} ${styles.active}` : styles.navLink
            }
          >
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.cartLink} ${styles.active}`
                : `${styles.navLink} ${styles.cartLink}`
            }
          >
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            <span className={styles.cartText}>Cart</span>
            {numberOfItems > 0 && (
              <span
                className={styles.cartBadge}
                aria-label={`${numberOfItems} items in cart`}
              >
                {numberOfItems}
              </span>
            )}
          </NavLink>

          <button
            onClick={toggleTheme}
            className={styles.themeButton}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            <span className={styles.themeIcon}>
              {theme === 'light' ? (
                <i className="fa-solid fa-moon" aria-hidden="true"></i>
              ) : (
                <i className="fa-solid fa-sun" aria-hidden="true"></i>
              )}
            </span>
          </button>
        </nav>

        {/* Hamburger Button for Mobile */}
        <button
          className={styles.hamburgerButton}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          <span className={styles.hamburgerIcon}>
            {isMenuOpen ? (
              <i className="fa-solid fa-xmark" aria-hidden="true"></i>
            ) : (
              <i className="fa-solid fa-bars" aria-hidden="true"></i>
            )}
          </span>
        </button>
      </div>

      {/* Mobile Navigation Menu */}
      <nav
        id="mobile-navigation"
        className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileNavContent}>
          <NavLink
            to="/"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.mobileNavLink} ${styles.active}`
                : styles.mobileNavLink
            }
          >
            <i className="fa-solid fa-home" aria-hidden="true"></i>
            Home
          </NavLink>
          <NavLink
            to="/shop"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.mobileNavLink} ${styles.active}`
                : styles.mobileNavLink
            }
          >
            <i className="fa-solid fa-store" aria-hidden="true"></i>
            Shop
          </NavLink>
          <NavLink
            to="/cart"
            onClick={closeMenu}
            className={({ isActive }) =>
              isActive
                ? `${styles.mobileNavLink} ${styles.active}`
                : styles.mobileNavLink
            }
          >
            <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
            Cart ({numberOfItems})
          </NavLink>

          <button
            onClick={() => {
              toggleTheme();
              closeMenu();
            }}
            className={styles.mobileThemeButton}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
          >
            {theme === 'light' ? (
              <>
                <i className="fa-solid fa-moon" aria-hidden="true"></i>
                Dark Mode
              </>
            ) : (
              <>
                <i className="fa-solid fa-sun" aria-hidden="true"></i>
                Light Mode
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className={styles.mobileOverlay}
          onClick={closeMenu}
          aria-hidden="true"
        ></div>
      )}
    </header>
  );
}

Header.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
