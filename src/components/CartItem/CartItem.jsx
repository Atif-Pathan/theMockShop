import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './CartItem.module.css';

export default function CartItem({
  item,
  handleUpdateQuantity,
  handleRemoveItem,
}) {
  // This component now has its own "draft" state for the quantity
  const [draftQuantity, setDraftQuantity] = useState(item.quantity);

  // This effect ensures that if the cart is updated from elsewhere,
  // this component's draft state resets to the new official quantity.
  useEffect(() => {
    setDraftQuantity(item.quantity);
  }, [item.quantity]);

  const handleInputChange = (e) => {
    setDraftQuantity(Number(e.target.value));
  };

  const handleUpdateClick = () => {
    handleUpdateQuantity(item.id, draftQuantity);
  };

  // The "Update" button only shows if the draft quantity is different
  // from the official quantity in the cart.
  const showUpdateButton = draftQuantity !== item.quantity;

  return (
    <div className={styles.cartItem}>
      <img src={item.images[0]} alt={item.title} className={styles.itemImage} />
      <div className={styles.itemDetails}>
        <Link to={`/shop/${item.slug}`}>
          <h3>{item.title}</h3>
        </Link>
        <p>${item.price} each</p>
      </div>
      <div className={styles.actions}>
        <label htmlFor={`quantity-${item.id}`}>Qty:</label>
        <input
          id={`quantity-${item.id}`}
          type="number"
          value={draftQuantity}
          onChange={handleInputChange}
          min="0"
          className={styles.quantityInput}
        />
        <button
          onClick={handleUpdateClick}
          className={`${styles.updateButton} ${
            showUpdateButton ? styles.visible : ''
          }`}
        >
          <i className="fa-solid fa-check"></i>
        </button>
        <button
          onClick={() => handleRemoveItem(item.id)}
          className={styles.removeButton}
        >
          <i className="fa-solid fa-trash"></i>
        </button>
      </div>
      <p className={styles.subtotal}>Subtotal: ${item.price * item.quantity}</p>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  handleUpdateQuantity: PropTypes.func.isRequired,
  handleRemoveItem: PropTypes.func.isRequired,
};
