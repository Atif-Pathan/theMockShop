import { Link, useOutletContext } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem.jsx';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { cartItems, handleUpdateQuantity, handleRemoveItem } =
    useOutletContext();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className={styles.page}>
      <h1>Your Cart</h1>
      {cartItems.length < 1 ? (
        <div className={styles.emptyCart}>
          <p>Your Cart is empty</p>
          <Link to="/shop">
            <button>Go to Shop</button>
          </Link>
        </div>
      ) : (
        <div>
          <div className={styles.cartList}>
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <strong>Total Price: ${totalPrice.toFixed(2)}</strong>
          </div>
          <div className={styles.checkoutSection}>
            <h3>Checkout</h3>
            <p>(Payment section disabled for this demo)</p>
          </div>
        </div>
      )}
    </div>
  );
}
