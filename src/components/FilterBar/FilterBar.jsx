// The JSX for this component remains the same, but it will now be
// styled correctly by its updated CSS module.
import PropTypes from 'prop-types';
import styles from './FilterBar.module.css';

export default function FilterBar({
  searchTerm,
  onSearchChange,
  categories,
  selectedCategory,
  onCategoryChange,
}) {
  return (
    <section className={styles.filterBar} aria-label="Product Filters">
      <div className={styles.searchWrapper}>
        <i className={`fa-solid fa-magnifying-glass ${styles.searchIcon}`}></i>
        <input
          type="search"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={onSearchChange}
          className={styles.searchInput}
          aria-label="Search products by name"
        />
      </div>
      <div className={styles.categoryFilters}>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={`${styles.categoryButton} ${
              selectedCategory === category ? styles.active : ''
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </section>
  );
}

FilterBar.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  categories: PropTypes.arrayOf(PropTypes.string).isRequired,
  selectedCategory: PropTypes.string.isRequired,
  onCategoryChange: PropTypes.func.isRequired,
};
