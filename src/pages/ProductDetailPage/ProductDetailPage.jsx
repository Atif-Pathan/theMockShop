import { useState, useEffect } from 'react';
import { Link, useLoaderData, useOutletContext } from 'react-router-dom';
import ProductCard from '../../components/ProductCard/ProductCard';
import styles from './ProductDetailPage.module.css';

export default function ProductDetailPage() {
  const { product, related } = useLoaderData();
  const { cartItems, handleAddToCart } = useOutletContext();

  // Check if the item is already in the cart to set the initial state
  const itemInCart = cartItems.find((item) => item.id === product.id);
  const initialQuantity = itemInCart ? itemInCart.quantity : 1;

  // local state is initialized intelligently
  const [quantity, setQuantity] = useState(initialQuantity);
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  // This effect synchronizes the local state if the global cart changes.
  // This fixes the input not updating after a click.
  useEffect(() => {
    const updatedItemInCart = cartItems.find((item) => item.id === product.id);
    if (updatedItemInCart) {
      setQuantity(updatedItemInCart.quantity);
    } else {
      // If item was removed from cart elsewhere, reset to 1
      setQuantity(1);
    }
  }, [cartItems, product.id]);

  useEffect(() => {
    // When navigating between product pages, reset to the first image of the new product
    if (product.images && product.images.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product.id, product.images]);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    setQuantity(isNaN(value) ? 0 : value);
  };

  const increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decrement = () => {
    setQuantity((prevQuantity) => Math.max(0, prevQuantity - 1));
  };

  const buttonText = itemInCart ? 'Update Cart' : 'Add to Cart';

  return (
    <div className={styles.page}>
      <Link to="/shop" className={styles.backLink}>
        <i className="fa-solid fa-arrow-left" aria-hidden="true"></i>
        Back to Shop
      </Link>
      <section className={styles.productSection}>
        {/* --- IMAGE GALLERY COLUMN --- */}
        <div className={styles.imageSection}>
          <img
            src={selectedImage}
            alt={product.title}
            className={styles.mainImage}
          />
          {product.images && product.images.length > 1 && (
            <div className={styles.thumbnailGrid}>
              {product.images.map((image, index) => (
                <button
                  key={index}
                  className={`${styles.thumbnailButton} ${selectedImage === image ? styles.active : ''}`}
                  onClick={() => setSelectedImage(image)}
                  aria-label={`View image ${index + 1}`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1} for ${product.title}`}
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* --- BENTO BOX INFO COLUMN --- */}
        <div className={styles.productInfo}>
          <div className={styles.titleBox}>
            <h1 className={styles.productTitle}>{product.title}</h1>
            <div className={styles.productPrice}>${product.price}</div>
          </div>

          <div className={styles.descriptionBox}>
            <p className={styles.productDescription}>{product.description}</p>
          </div>

          <div className={styles.purchaseBox}>
            <div className={styles.quantityWrapper}>
              <label htmlFor="item-quantity" className="sr-only">
                Quantity
              </label>
              <button
                type="button"
                onClick={decrement}
                className={styles.quantityButton}
                aria-label="Decrease quantity"
              >
                &ndash;
              </button>
              <input
                type="number"
                name="item-quantity"
                id="item-quantity"
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
              <i className="fa-solid fa-cart-shopping" aria-hidden="true"></i>
              {buttonText}
            </button>
          </div>
        </div>
      </section>

      <section className={styles.relatedSection}>
        <h2 className={styles.relatedTitle}>You might also like</h2>
        <div className={styles.relatedGrid}>
          {related.map((item) => {
            const relatedItemInCart = cartItems.find(
              (cartItem) => cartItem.id === item.id,
            );
            const relatedInitialQuantity = relatedItemInCart
              ? relatedItemInCart.quantity
              : 1;
            return (
              <ProductCard
                key={item.id}
                product={item}
                handleAddToCart={handleAddToCart}
                initialQuantity={relatedInitialQuantity}
                isInCart={!!relatedItemInCart}
              />
            );
          })}
        </div>
      </section>
    </div>
  );
}
