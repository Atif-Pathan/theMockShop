import './App.css';
import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/Header/Header.jsx';
import styles from './App.module.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [theme, setTheme] = useState('light');

  const handleAddToCart = (product, quantity) => {
    // If quantity is 0 or less, treat it as a removal.
    if (quantity <= 0) {
      handleRemoveItem(product.id);
      return;
    }

    const existingItem = cartItems.find((item) => item.id === product.id);

    if (existingItem) {
      const updatedCartItems = cartItems.map((item) =>
        item.id === product.id
          ? // Set quantity, don't add to it.
            { ...item, quantity: quantity }
          : item,
      );
      setCartItems(updatedCartItems);
    } else {
      const updatedCartItems = [...cartItems, { ...product, quantity }];
      setCartItems(updatedCartItems);
    }
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      // if quanitity is 0 then we should delete the item instead
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

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  document.documentElement.className = theme;

  return (
    <div className={styles.app}>
      <Header
        numberOfItems={cartItems.length}
        theme={theme}
        toggleTheme={toggleTheme}
      />
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
    </div>
  );
}

export default App;
