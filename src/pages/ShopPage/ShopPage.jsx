import { useMemo } from 'react';
import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard.jsx';
import FilterBar from '../../components/FilterBar/FilterBar.jsx';
import styles from './ShopPage.module.css';

export default function ShopPage() {
  const allProducts = useLoaderData();
  const { cartItems, handleAddToCart } = useOutletContext();

  // Use the useSearchParams hook instead of useState
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the current filter values from the URL search params
  const searchTerm = searchParams.get('q') || '';
  const selectedCategory = searchParams.get('category') || 'All';

  const categories = useMemo(() => {
    const setNames = new Set(allProducts.map((p) => p.category.name));
    return ['All', ...setNames];
  }, [allProducts]);

  // The filtering logic remains the same, but it's driven by the URL
  const filteredProducts = allProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'All' || product.category.name === selectedCategory;
    const matchesSearch = product.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Handlers update the URL search params, which triggers a re-render
  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (newSearchTerm) {
      newParams.set('q', newSearchTerm);
    } else {
      newParams.delete('q');
    }
    setSearchParams(newParams);
  };

  const handleCategoryChange = (category) => {
    const newParams = new URLSearchParams(searchParams);
    if (category === 'All') {
      newParams.delete('category');
    } else {
      newParams.set('category', category);
    }
    setSearchParams(newParams);
  };

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
        onSearchChange={handleSearchChange}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />

      {filteredProducts.length > 0 ? (
        <div className={styles.productGrid}>
          {filteredProducts.map((prod) => {
            const itemInCart = cartItems.find((item) => item.id === prod.id);
            const initialQuantity = itemInCart ? itemInCart.quantity : 1;

            return (
              <ProductCard
                key={prod.id}
                product={prod}
                handleAddToCart={handleAddToCart}
                initialQuantity={initialQuantity}
                isInCart={!!itemInCart}
              />
            );
          })}
        </div>
      ) : (
        <div className={styles.noResults}>
          <h2>No products match</h2>
          <p>Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
}
