import { describe, it, expect, beforeEach, vi } from 'vitest';
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor, within } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

// Import your app's components and providers
import App from './App';
import { ThemeProvider } from './contexts/ThemeContext';
import HomePage from './pages/HomePage/HomePage';
import ShopPage from './pages/ShopPage/ShopPage';
import ProductDetailPage from './pages/ProductDetailPage/ProductDetailPage';
import CartPage from './pages/CartPage/CartPage';
import ErrorPage from './pages/ErrorPage/ErrorPage';

// Import the API functions to mock them
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProductsBySlug,
} from './services/productsAPI.js';

// ARRANGE: Create a small, consistent set of mock products for our tests.
const mockProducts = [
  {
    id: 1,
    title: 'Classic Red Pullover Hoodie',
    price: 10,
    slug: 'classic-red-pullover-hoodie',
    category: { id: 1, name: 'Clothes' },
    images: ['hoodie.jpg'],
  },
  {
    id: 2,
    title: 'Sleek Wireless Computer Mouse',
    price: 69,
    slug: 'sleek-wireless-computer-mouse',
    category: { id: 2, name: 'Electronics' },
    images: ['mouse.jpg'],
  },
];

// Define the routes here, just like in your main.jsx.
const routes = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'shop', element: <ShopPage />, loader: getAllProducts },
      {
        path: 'shop/:productSlug',
        element: <ProductDetailPage />,
        loader: async ({ params }) => ({
          product: await getProductBySlug(params.productSlug),
          related: await getRelatedProductsBySlug(params.productSlug),
        }),
      },
      { path: 'cart', element: <CartPage /> },
    ],
  },
];

// A helper function to render our app with the full router and theme context
const renderApp = (initialRoute = '/') => {
  const router = createMemoryRouter(routes, {
    initialEntries: [initialRoute],
    hydrationData: { loaderData: {} },
  });
  return render(
    <ThemeProvider>
      <RouterProvider router={router} />
    </ThemeProvider>,
  );
};

// Mock the loaders by controlling what the API functions return
beforeEach(() => {
  getAllProducts.mockResolvedValue([...mockProducts]);
  getProductBySlug.mockResolvedValue(mockProducts[0]);
  getRelatedProductsBySlug.mockResolvedValue([mockProducts[1]]);
});

describe('App Integration and User Journeys', () => {
  it('renders the HomePage on the root route and allows navigation to the shop', async () => {
    const user = userEvent.setup();
    renderApp('/');

    expect(
      screen.getByRole('heading', { name: /your essential style/i }),
    ).toBeInTheDocument();

    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    await user.click(within(desktopNav).getByRole('link', { name: /shop/i }));

    expect(
      await screen.findByRole('heading', { name: /the collection/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /classic red pullover hoodie/i }),
    ).toBeInTheDocument();
  });

  it('handles adding multiple, distinct items to the cart', async () => {
    const user = userEvent.setup();
    renderApp('/shop');

    const hoodieHeading = await screen.findByRole('heading', {
      name: /classic red pullover hoodie/i,
    });
    const mouseHeading = screen.getByRole('heading', {
      name: /sleek wireless computer mouse/i,
    });

    const hoodieCard = hoodieHeading.closest('article');
    const mouseCard = mouseHeading.closest('article');

    await user.click(within(hoodieCard).getByRole('button', { name: /add/i }));
    await user.click(within(mouseCard).getByRole('button', { name: /add/i }));

    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    expect(
      within(desktopNav).getByLabelText(/2 items in cart/i),
    ).toBeInTheDocument();

    await user.click(within(desktopNav).getByRole('link', { name: /cart/i }));
    expect(
      await screen.findByRole('heading', { name: /shopping cart/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /classic red pullover hoodie/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /sleek wireless computer mouse/i }),
    ).toBeInTheDocument();
  });

  it('updates the quantity of an existing item from the shop page', async () => {
    const user = userEvent.setup();
    renderApp('/shop');

    const hoodieHeading = await screen.findByRole('heading', {
      name: /classic red pullover hoodie/i,
    });
    const hoodieCard = hoodieHeading.closest('article');

    // 1. Add the item with quantity 1
    await user.click(within(hoodieCard).getByRole('button', { name: /add/i }));

    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    expect(
      within(desktopNav).getByLabelText(/1 items in cart/i),
    ).toBeInTheDocument();

    // 2. On the product card, increase the quantity to 3
    const incrementBtn = within(hoodieCard).getByRole('button', {
      name: /increase quantity/i,
    });
    await user.click(incrementBtn); // quantity on card is now 2
    await user.click(incrementBtn); // quantity on card is now 3

    // 3. Click the "Update" button
    const updateButton = await within(hoodieCard).findByRole('button', {
      name: /update/i,
    });
    await user.click(updateButton);

    // 4. Badge count should still be 1 (one unique item)
    expect(
      within(desktopNav).getByLabelText(/1 items in cart/i),
    ).toBeInTheDocument();

    // 5. Navigate to cart and verify the quantity is now 3
    await user.click(within(desktopNav).getByRole('link', { name: /cart/i }));
    const quantityInput = await screen.findByLabelText(
      /quantity for classic red pullover hoodie/i,
    );
    expect(quantityInput).toHaveValue(3);
  });

  it('handles the full "add to cart", "update quantity in cart", and "remove from cart" flow', async () => {
    const user = userEvent.setup();
    renderApp('/shop');

    const hoodieHeading = await screen.findByRole('heading', {
      name: /classic red pullover hoodie/i,
    });
    const hoodieCard = hoodieHeading.closest('article');

    await user.click(within(hoodieCard).getByRole('button', { name: /add/i }));

    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    expect(
      within(desktopNav).getByLabelText(/1 items in cart/i),
    ).toBeInTheDocument();

    await user.click(within(desktopNav).getByRole('link', { name: /cart/i }));

    const cartItemHeading = await screen.findByRole('heading', {
      name: /classic red pullover hoodie/i,
    });
    const cartItem = cartItemHeading.closest('article');

    const incrementButton = within(cartItem).getByRole('button', {
      name: /increase quantity/i,
    });
    await user.click(incrementButton);

    await waitFor(() => {
      expect(screen.getByText(/\$20.00/i)).toBeInTheDocument();
    });

    const removeButton = within(cartItem).getByRole('button', {
      name: /remove/i,
    });
    await user.click(removeButton);

    expect(
      screen.getByText(/your cart is currently empty/i),
    ).toBeInTheDocument();
    expect(
      within(desktopNav).queryByLabelText(/\d+ items in cart/i),
    ).not.toBeInTheDocument();
  });
});
