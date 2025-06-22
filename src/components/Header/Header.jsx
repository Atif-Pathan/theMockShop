import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './Header.module.css';

export default function Header({ numberOfItems, theme, toggleTheme }) {
  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/shop">Shop</NavLink>
      </nav>
      <div className={styles.controls}>
        <NavLink to="/cart">
          <i className="fa-solid fa-cart-shopping"></i> Cart ({numberOfItems})
        </NavLink>
        <button onClick={toggleTheme} className={styles.themeButton}>
          {theme === 'light' ? (
            <i className="fa-solid fa-moon"></i>
          ) : (
            <i className="fa-solid fa-sun"></i>
          )}
        </button>
      </div>
    </header>
  );
}

Header.propTypes = {
  numberOfItems: PropTypes.number.isRequired,
  theme: PropTypes.string.isRequired,
  toggleTheme: PropTypes.func.isRequired,
};
