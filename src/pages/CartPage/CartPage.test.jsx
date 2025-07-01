// src/pages/CartPage/CartPage.test.jsx
import userEvent from '@testing-library/user-event';
import { render, screen, within } from '../../tests/test-utils';
import CartPage from './CartPage';
import confetti from 'canvas-confetti';

// Mock the hooks and external libraries used by the page
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Keep all original exports like <Link>
    useOutletContext: vi.fn(),
  };
});
// This mock is already in setup.js, but being explicit here makes the test's dependencies clear
vi.mock('canvas-confetti');

import { useOutletContext } from 'react-router-dom';

describe('CartPage', () => {
  // This block tests the page's appearance and behavior when the cart is empty.
  describe('when cart is empty', () => {
    beforeEach(() => {
      // Arrange: Provide an empty cart via the mocked context hook
      useOutletContext.mockReturnValue({
        cartItems: [],
        handleUpdateQuantity: vi.fn(),
        handleRemoveItem: vi.fn(),
      });
    });

    it('displays an empty cart message and a link to the shop', () => {
      render(<CartPage />);
      expect(
        screen.getByText(/your cart is currently empty/i),
      ).toBeInTheDocument();
      const continueButton = screen.getByRole('button', {
        name: /continue shopping/i,
      });
      expect(continueButton).toBeInTheDocument();
      expect(continueButton.closest('a')).toHaveAttribute('href', '/shop');
    });

    it('does not display the order summary card', () => {
      render(<CartPage />);
      expect(
        screen.queryByRole('heading', { name: /order summary/i }),
      ).not.toBeInTheDocument();
    });
  });

  // This block tests the page's appearance and behavior when the cart contains items.
  describe('when cart has items', () => {
    let mockUpdateQuantity;
    let mockRemoveItem;

    // Arrange: Create mock data and handlers that will be used in this block.
    const mockCartItems = [
      {
        id: 1,
        title: 'Test Hoodie',
        price: 10,
        quantity: 2,
        slug: 'test-hoodie',
        images: ['hoodie.jpg'],
      },
      {
        id: 2,
        title: 'Test Mouse',
        price: 25,
        quantity: 1,
        slug: 'test-mouse',
        images: ['mouse.jpg'],
      },
    ];

    beforeEach(() => {
      mockUpdateQuantity = vi.fn();
      mockRemoveItem = vi.fn();
      useOutletContext.mockReturnValue({
        cartItems: mockCartItems,
        handleUpdateQuantity: mockUpdateQuantity,
        handleRemoveItem: mockRemoveItem,
      });
    });

    it('renders a CartItem for each item and does not show the empty message', () => {
      render(<CartPage />);
      expect(screen.getAllByRole('article')).toHaveLength(2);
      expect(
        screen.queryByText(/your cart is currently empty/i),
      ).not.toBeInTheDocument();
    });

    it('calculates and displays the correct order summary totals', () => {
      render(<CartPage />);
      // Manually calculate the expected totals based on mockCartItems.
      const subtotal = 10 * 2 + 25 * 1; // 45.00
      const shipping = 5.0;
      const tax = subtotal * 0.08; // 3.60
      const total = subtotal + shipping + tax; // 53.60

      // Find the summary card to scope our queries
      const summaryCard = screen.getByRole('complementary', {
        name: /order summary/i,
      });

      // Assert each line item is correct
      expect(
        within(summaryCard).getByText(`$${subtotal.toFixed(2)}`),
      ).toBeInTheDocument();
      expect(
        within(summaryCard).getByText(`$${shipping.toFixed(2)}`),
      ).toBeInTheDocument();
      expect(
        within(summaryCard).getByText(`$${tax.toFixed(2)}`),
      ).toBeInTheDocument();
      expect(
        within(summaryCard).getByText(`$${total.toFixed(2)}`),
      ).toBeInTheDocument();
    });

    it('calls handleUpdateQuantity from context when a cart item quantity is changed', async () => {
      const user = userEvent.setup();
      render(<CartPage />);

      // Find the specific CartItem for the "Test Hoodie"
      const hoodieItem = screen
        .getByRole('heading', {
          name: /test hoodie/i,
        })
        .closest('article');

      // Within that item, find and click the "+" (increase quantity) button.
      const incrementBtn = within(hoodieItem).getByRole('button', {
        name: /increase quantity/i,
      });
      await user.click(incrementBtn);

      // Assert that the handler was called with the correct arguments
      expect(mockUpdateQuantity).toHaveBeenCalledTimes(1);
      expect(mockUpdateQuantity).toHaveBeenCalledWith(1, 3); // id: 1, newQuantity: 2 + 1 = 3
    });

    it('calls handleRemoveItem from context when the remove button is clicked', async () => {
      const user = userEvent.setup();
      render(<CartPage />);

      // Find the specific CartItem for the "Test Mouse"
      const mouseItem = screen
        .getByRole('heading', { name: /test mouse/i })
        .closest('article');

      // Within that item, find and click the remove (trash icon) button.
      const removeBtn = within(mouseItem).getByRole('button', {
        name: /remove test mouse from cart/i,
      });
      await user.click(removeBtn);

      // Assert that the handler was called with the correct product ID
      expect(mockRemoveItem).toHaveBeenCalledTimes(1);
      expect(mockRemoveItem).toHaveBeenCalledWith(2); // id: 2
    });

    it('fires confetti when the checkout button is clicked', async () => {
      const user = userEvent.setup();
      render(<CartPage />);

      const checkoutBtn = screen.getByRole('button', {
        name: /proceed to checkout/i,
      });
      await user.click(checkoutBtn);

      // Assert that the mocked confetti function was called
      expect(confetti).toHaveBeenCalledTimes(1);
    });

    // This new test verifies that the summary re-calculates when the cart changes.
    it('updates the order summary when the cart is updated', () => {
      // Initial render with original items
      const { rerender } = render(<CartPage />);
      const summaryCard = screen.getByRole('complementary', {
        name: /order summary/i,
      });
      expect(within(summaryCard).getByText('$53.60')).toBeInTheDocument();

      // Create a new state for the cart, as if an item was removed
      const updatedCartItems = [mockCartItems[0]]; // Only the hoodie remains
      useOutletContext.mockReturnValue({
        cartItems: updatedCartItems,
        handleUpdateQuantity: mockUpdateQuantity,
        handleRemoveItem: mockRemoveItem,
      });

      // Re-render the component with the new context value
      rerender(<CartPage />);

      // Manually calculate the new expected totals
      const newSubtotal = 10 * 2; // 20.00
      const newShipping = 5.0;
      const newTax = newSubtotal * 0.08; // 1.60
      const newTotal = newSubtotal + newShipping + newTax; // 26.60

      // Assert the summary now shows the new total
      expect(
        within(summaryCard).getByText(`$${newTotal.toFixed(2)}`),
      ).toBeInTheDocument();
    });
  });
});
