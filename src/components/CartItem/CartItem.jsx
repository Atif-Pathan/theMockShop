import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CartItem.module.css';

export default function CartItem({
  item,
  handleUpdateQuantity,
  handleRemoveItem,
}) {
  const handleInputChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (newQuantity >= 1) {
      handleUpdateQuantity(item.id, newQuantity);
    }
  };

  const increment = () => {
    handleUpdateQuantity(item.id, item.quantity + 1);
  };

  const decrement = () => {
    if (item.quantity > 1) {
      handleUpdateQuantity(item.id, item.quantity - 1);
    }
  };

  return (
    <article className={styles.cartItem}>
      <Link to={`/shop/${item.slug}`} className={styles.itemImageLink}>
        <img
          src={item.images[0]}
          alt={item.title}
          className={styles.itemImage}
        />
      </Link>

      <div className={styles.itemDetails}>
        <Link to={`/shop/${item.slug}`}>
          <h3 className={styles.itemTitle}>{item.title}</h3>
        </Link>
        <p className={styles.itemPrice}>
          ${item.price} each (Subtotal: ${item.price * item.quantity})
        </p>
      </div>

      <div className={styles.actions}>
        <div className={styles.quantityWrapper}>
          <button
            type="button"
            onClick={decrement}
            className={styles.quantityButton}
            aria-label="Decrease quantity"
          >
            &ndash;
          </button>
          <label htmlFor={`quantity-${item.id}`} className="sr-only">
            Quantity for {item.title}
          </label>
          <input
            id={`quantity-${item.id}`}
            type="number"
            value={item.quantity}
            onChange={handleInputChange}
            min="1"
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
          onClick={() => handleRemoveItem(item.id)}
          className={styles.removeButton}
          aria-label={`Remove ${item.title} from cart`}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};
