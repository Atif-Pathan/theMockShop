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
  // local state is initialized intelligently
  const [quantity, setQuantity] = useState(initialQuantity);

  // This effect ensures that if the cart updates from elsewhere,
  // the card's quantity reflects it.
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const buttonText = isInCart ? 'Update Cart' : 'Add to Cart';

  return (
    <div className={styles.card}>
      <Link to={`/shop/${product.slug}`} className={styles.link}>
        <img
          className={styles.image}
          src={product.images[0]}
          alt={product.title}
        />
        <h2 className={styles.title}>{product.title}</h2>
        <p className={styles.price}>${product.price}</p>
      </Link>
      <div className={styles.actions}>
        <label htmlFor={`quantity-${product.id}`}>Qty:</label>
        <input
          type="number"
          name="item-quantity"
          id={`quantity-${product.id}`}
          min={0}
          value={quantity}
          onChange={handleQuantityChange}
          className={styles.quantityInput}
        />
        <button onClick={() => handleAddToCart(product, quantity)}>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
  handleAddToCart: PropTypes.func.isRequired,
  initialQuantity: PropTypes.number.isRequired,
  isInCart: PropTypes.bool.isRequired,
};
