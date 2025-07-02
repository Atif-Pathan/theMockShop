import './App.css';
import { useState, useEffect } from 'react';
import { Outlet, ScrollRestoration } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import styles from './App.module.css';
import { Analytics } from '@vercel/analytics/react';

function App() {
  // Read from localStorage only on the first render.
  // This function runs only once when the component first mounts.
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cartItems');
      // If localData exists, parse it. Otherwise, return an empty array.
      return localData ? JSON.parse(localData) : [];
    } catch (error) {
      console.error('Could not parse cart items from localStorage', error);
      return [];
    }
  });

  // Write to localStorage whenever cartItems changes.
  // This effect runs every time the `cartItems` state is updated.
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product, quantity) => {
    if (quantity <= 0) {
      handleRemoveItem(product.id);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id ? { ...item, quantity: quantity } : item,
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCartItems);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }
    const updatedCartItems = cartItems.map((item) =>
      item.id === productId ? { ...item, quantity: newQuantity } : item,
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (productId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== productId);
    setCartItems(updatedCartItems);
  };

  return (
    <>
      <div className={styles.app}>
        <Header numberOfItems={cartItems.length} />
        <main className={styles.mainContent}>
          <Outlet
            context={{
              cartItems,
              handleAddToCart,
              handleUpdateQuantity,
              handleRemoveItem,
            }}
          />
        </main>
        <ScrollRestoration />
      </div>
      <Analytics />
    </>
  );
}

export default App;
