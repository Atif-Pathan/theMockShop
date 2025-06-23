import { useState, useMemo } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const allProducts = useLoaderData();
  const { cartItems, handleAddToCart } = useOutletContext();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = useMemo(() => {
    const setNames = new Set(allProducts.map((p) => p.category.name));
    return ['All', ...setNames];
  }, [allProducts]);

  const filtered = allProducts.filter((product) => {
    const matchCat =
      selectedCategory === 'All' || product.category.name === selectedCategory;
    const matchSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>The Collection</h1>
        <p className={styles.subtitle}>
          Timeless design and modern craftsmanship. Discover high-quality pieces
          for every occasion.
        </p>
      </header>

      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {filtered.length ? (
        <div className={styles.productGrid}>
          {filtered.map((prod) => {
            const inCart = cartItems.find((item) => item.id === prod.id);
            const initQty = inCart ? inCart.quantity : 1;
            return (
              <ProductCard
                key={prod.id}
                product={prod}
                handleAddToCart={handleAddToCart}
                initialQuantity={initQty}
                isInCart={!!inCart}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h2>No products match</h2>
          <p>Try changing your search or filters.</p>
        </div>
      )}
    </div>
  );
}
