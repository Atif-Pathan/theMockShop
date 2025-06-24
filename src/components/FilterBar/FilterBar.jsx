import styles from './FilterBar.module.css';
import PropTypes from 'prop-types';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.searchWrapper}>
        <i
          className={`fa-solid fa-search ${styles.searchIcon}`}
          aria-hidden="true"
        ></i>
        <label htmlFor="search" className="sr-only">
          Search products
        </label>
        <input
          type="search"
          id="search"
          className={styles.searchInput}
          placeholder="Search for products..."
          value={searchTerm}
          onChange={onSearchChange}
        />
      </div>

      <div className={styles.categoryFilters}>
        {categories.map((category) => (
          <button
            key={category}
            className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
            onClick={() => onCategoryChange(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
}

FilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
