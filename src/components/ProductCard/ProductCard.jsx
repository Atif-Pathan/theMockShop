import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './ProductCard.module.css';

export default function ProductCard({
  product,
  handleAddToCart,
  initialQuantity,
  isInCart,
}) {
  const [quantity, setQuantity] = useState(initialQuantity);

  // This effect ensures the card's quantity updates if the cart changes elsewhere
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    // Allow empty input for typing, but treat non-numbers as 0
    setQuantity(isNaN(value) ? 0 : value);
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const buttonText = isInCart ? 'Update Cart' : 'Add to Cart';

  return (
    <article className={styles.card}>
      <Link to={`/shop/${product.slug}`} className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={product.images[0]}
          alt={product.title}
        />
      </Link>

      <div className={styles.details}>
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
      </div>

      <footer className={styles.actionsFooter}>
        <div className={styles.quantityWrapper}>
          <button
            type="button"
            onClick={decrement}
            className={styles.quantityButton}
            aria-label="Decrease quantity"
          >
            &ndash;
          </button>
          <label htmlFor={`quantity-${product.id}`} className="sr-only">
            Quantity for {product.title}
          </label>
          <input
            id={`quantity-${product.id}`}
            type="number"
            min="0"
            value={quantity}
            onChange={handleQuantityChange}
            className={styles.quantityInput}
          />
          <button
            type="button"
            onClick={increment}
            className={styles.quantityButton}
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
        <button
          onClick={() => handleAddToCart(product, quantity)}
          className={styles.addToCartButton}
        >
          {buttonText}
        </button>
      </footer>
    </article>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  isInCart: PropTypes.bool.isRequired,
};
