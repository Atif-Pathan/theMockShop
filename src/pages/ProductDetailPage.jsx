import { useState, useEffect } from 'react';
import { useLoaderData, useOutletContext } from 'react-router-dom';
import ProductCard from '../components/ProductCard/ProductCard';

export default function ProductDetailPage() {
  const { product, related } = useLoaderData();
  const { cartItems, handleAddToCart } = useOutletContext();

  // Check if the item is already in the cart to set the initial state
  const itemInCart = cartItems.find((item) => item.id === product.id);
  const initialQuantity = itemInCart ? itemInCart.quantity : 1;

  // local state is initialized intelligently
  const [quantity, setQuantity] = useState(initialQuantity);

  // NEW: This effect synchronizes the local state if the global cart changes.
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

  const handleQuantityChange = (event) => {
    setQuantity(Number(event.target.value));
  };

  const buttonText = itemInCart ? 'Update Cart' : 'Add to Cart';

  return (
    <>
      <div>
        <img src={product.images[0]} alt={product.title} />
        <h3>{product.title}</h3>
        <p>{product.description}</p>
        <strong>${product.price}</strong>
      </div>
      <label htmlFor="item-quantity">Quantity</label>
      <input
        type="number"
        name="item-quantity"
        id="item-quantity"
        min={0} // allow user to delete the item if needed
        value={quantity}
        onChange={handleQuantityChange}
      />
      {/* The onClick function is the same, but the text changes! */}
      <button onClick={() => handleAddToCart(product, quantity)}>
        {buttonText}
      </button>
      <div>
        <h3>You might also like:</h3>
        <div className="related-products-grid">
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
      </div>
    </>
  );
}
