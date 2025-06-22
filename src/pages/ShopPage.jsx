import ProductCard from '../components/ProductCard/ProductCard.jsx';
import FilterBar from '../components/FilterBar.jsx';
import { useLoaderData, useOutletContext } from 'react-router-dom';

export default function ShopPage() {
  const products = useLoaderData();
  // Get the addToCart function to pass it down to each card
  const { cartItems, handleAddToCart } = useOutletContext();

  return (
    <>
      <h1>Hello from the Shop!</h1>
      <h3>Browse our collection below</h3>
      <FilterBar />
      <div className="product-grid">
        {products.map((prod) => {
          // For each product, check if it's in the cart
          const itemInCart = cartItems.find((item) => item.id === prod.id);
          // Determine the initial quantity to pass down
          const initialQuantity = itemInCart ? itemInCart.quantity : 1;

          return (
            <ProductCard
              key={prod.id}
              product={prod}
              handleAddToCart={handleAddToCart}
              // Pass the calculated initial quantity as a prop
              initialQuantity={initialQuantity}
              // Pass a boolean for easier logic inside the card
              isInCart={!!itemInCart}
            />
          );
        })}
      </div>
    </>
  );
}
