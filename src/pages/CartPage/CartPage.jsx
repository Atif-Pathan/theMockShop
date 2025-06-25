import { Link, useOutletContext } from 'react-router-dom';
import CartItem from '../../components/CartItem/CartItem.jsx';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { cartItems, handleUpdateQuantity, handleRemoveItem } =
    useOutletContext();

  const subtotal = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );
  // Example shipping and tax
  const shipping = subtotal > 0 ? 5.0 : 0;
  const tax = subtotal * 0.08;
  const totalPrice = subtotal + shipping + tax;

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <p className={styles.subtitle}>
          Review your items below before proceeding to checkout.
        </p>
      </header>

      {cartItems.length < 1 ? (
        <div className={styles.emptyCart}>
          <p>Your cart is currently empty.</p>
          <Link to="/shop">
            <button>Continue Shopping</button>
          </Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
          <section className={styles.cartList} aria-label="Items in your cart">
            {cartItems.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                handleUpdateQuantity={handleUpdateQuantity}
                handleRemoveItem={handleRemoveItem}
              />
            ))}
          </section>

          <aside className={styles.summaryCard} aria-label="Order summary">
            <h2 className={styles.summaryTitle}>Order Summary</h2>
            <div className={styles.summaryRow}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <div className={styles.summaryRow}>
              <span>Tax (8%)</span>
              <span>${tax.toFixed(2)}</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button className={styles.checkoutButton} disabled>
              Proceed to Checkout
            </button>
          </aside>
        </div>
      )}
    </main>
  );
}
