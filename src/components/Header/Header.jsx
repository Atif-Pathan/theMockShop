import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';
import { useTheme } from '../../contexts/ThemeContext';

export default function Header({ numberOfItems }) {
  const { theme, toggleTheme } = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.classList.add('mobile-menu-open');
    } else {
      document.documentElement.classList.remove('mobile-menu-open');
    }
    // Cleanup function to ensure the class is removed if the component unmounts
    return () => {
      document.documentElement.classList.remove('mobile-menu-open');
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <div className={styles.headerContent}>
        <Link to="/" className={styles.logo} onClick={closeMenu}>
          <span className={styles.logoText}>
            <em>the</em> EDIT
          </span>
        </Link>

        {/* Desktop Navigation (Your original, working code) */}
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
            aria-label={`Switch to ${
              theme === 'light' ? 'dark' : 'light'
            } theme`}
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

        {/* NEW: Mobile Controls Container */}
        <div className={styles.mobileControls}>
          <button
            onClick={toggleTheme}
            className={styles.themeButton}
            aria-label={`Switch to ${
              theme === 'light' ? 'dark' : 'light'
            } theme`}
          >
            <span className={styles.themeIcon}>
              {theme === 'light' ? (
                <i className="fa-solid fa-moon" aria-hidden="true"></i>
              ) : (
                <i className="fa-solid fa-sun" aria-hidden="true"></i>
              )}
            </span>
          </button>
          <div className={styles.hamburgerWrapper}>
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
            {/* Cart badge for mobile, only shows when menu is closed */}
            {!isMenuOpen && numberOfItems > 0 && (
              <span
                className={styles.cartBadge}
                aria-label={`${numberOfItems} items in cart`}
              >
                {numberOfItems}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
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
            Cart ({numberOfItems})
          </NavLink>
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
};
