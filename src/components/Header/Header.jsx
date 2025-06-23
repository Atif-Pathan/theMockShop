import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

export default function Header({ numberOfItems, theme, toggleTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const closeMenu = () => setIsMenuOpen(false);

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.logo} onClick={closeMenu}>
        The Wardrobe
      </Link>

      {/* Desktop Navigation */}
      <nav className={styles.desktopNav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
        <NavLink to="/cart">
          <i className="fa-solid fa-cart-shopping"></i> Cart ({numberOfItems})
        </NavLink>
        <button
          onClick={toggleTheme}
          className={styles.themeButton}
          aria-label="Toggle theme"
        >
          {theme === 'light' ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}
        </button>
      </nav>

      {/* Hamburger Button for Mobile */}
      <button
        className={styles.hamburgerButton}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label="Toggle navigation menu"
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? (
          <i className="fa-solid fa-xmark"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </button>

      {/* Mobile Navigation Menu */}
      <nav className={`${styles.mobileNav} ${isMenuOpen ? styles.open : ''}`}>
        <NavLink to="/" onClick={closeMenu}>
          Home
        </NavLink>
        <NavLink to="/shop" onClick={closeMenu}>
          Shop
        </NavLink>
        <NavLink to="/cart" onClick={closeMenu}>
          Cart ({numberOfItems})
        </NavLink>
      </nav>
    </header>
  );
}

Header.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
