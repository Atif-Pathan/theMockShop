// src/components/ProductCard/ProductCard.test.jsx

// Import our custom render function and screen query tool
import { render, screen } from '../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import ProductCard from './ProductCard';

// ARRANGE: Create mock data and props that can be reused across tests.
const mockProduct = {
  id: 1,
  slug: 'classic-tee',
  title: 'Classic Tee',
  price: 25,
  images: ['/images/tee.jpg', '/images/tee-2.jpg'],
};

// create a default set of props, including a mocked function for the handler.
// vi.fn() creates a "spy" that we can use to check if it was called.
const defaultProps = {
  product: mockProduct,
  handleAddToCart: vi.fn(),
  initialQuantity: 1,
  isInCart: false,
};

describe('ProductCard', () => {
  it('should render product information correctly', () => {
    // ARRANGE: Render the component with the default props.
    render(<ProductCard {...defaultProps} />);

    // ASSERT: Check that all the user-facing information is on the screen.
    // We use regular expressions with the 'i' flag for case-insensitivity,
    // which makes tests more resilient to minor text changes.
    expect(
      screen.getByRole('heading', { name: /classic tee/i }),
    ).toBeInTheDocument();

    expect(screen.getByText('$25')).toBeInTheDocument();

    const image = screen.getByRole('img', { name: /classic tee/i });
    expect(image).toBeInTheDocument();
    expect(image.src).toContain(mockProduct.images[0]);

    // Assert that the image is wrapped in a link pointing to the correct product page.
    const link = image.closest('a');
    expect(link).toHaveAttribute('href', `/shop/${mockProduct.slug}`);
  });

  it("should display 'Add' button when item is not in cart", () => {
    // ARRANGE: Render with isInCart: false (which is the default).
    render(<ProductCard {...defaultProps} />);

    // ASSERT: The button should have the text "Add".
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /update/i }),
    ).not.toBeInTheDocument();
  });

  it("should display 'Update' button when item is in cart", () => {
    // ARRANGE: Render, but override the isInCart prop to true.
    render(<ProductCard {...defaultProps} isInCart={true} />);

    // ASSERT: The button should now have the text "Update".
    expect(screen.getByRole('button', { name: /update/i })).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: /add/i }),
    ).not.toBeInTheDocument();
  });

  it('should increment and decrement quantity when buttons are clicked', async () => {
    // ARRANGE: Setup user-event and render the component.
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const quantityInput = screen.getByLabelText(/quantity for/i);
    const incrementButton = screen.getByRole('button', {
      name: /increase/i,
    });
    const decrementButton = screen.getByRole('button', {
      name: /decrease/i,
    });

    // ACT & ASSERT: Increment the quantity.
    await user.click(incrementButton);
    // Input values are always strings, so we assert against '2'.
    expect(quantityInput.value).toBe('2');

    // ACT & ASSERT: Decrement the quantity.
    await user.click(decrementButton);
    expect(quantityInput.value).toBe('1');
  });

  it('should not allow quantity to go below zero', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const quantityInput = screen.getByLabelText(/quantity for/i);
    const decrementButton = screen.getByRole('button', {
      name: /decrease/i,
    });

    // ACT: Click decrement once (1 -> 0), then click it again.
    await user.click(decrementButton);
    await user.click(decrementButton);

    // ASSERT: The quantity should remain '0' because of the component's internal logic.
    expect(quantityInput.value).toBe('0');
  });

  it('should call handleAddToCart with the correct product and quantity', async () => {
    const user = userEvent.setup();
    // ARRANGE: Create a specific mock function for this test to ensure no cross-contamination.
    const handleAddToCartMock = vi.fn();
    render(
      <ProductCard {...defaultProps} handleAddToCart={handleAddToCartMock} />,
    );

    const incrementButton = screen.getByRole('button', {
      name: /increase/i,
    });
    const addToCartButton = screen.getByRole('button', { name: /add/i });

    // ACT: Change the quantity to 3, then click the "Add" button.
    await user.click(incrementButton); // Quantity is now 2
    await user.click(incrementButton); // Quantity is now 3
    await user.click(addToCartButton);

    // ASSERT: Check that our mock function was called correctly.
    expect(handleAddToCartMock).toHaveBeenCalledTimes(1);
    expect(handleAddToCartMock).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('should update its local quantity if the initialQuantity prop changes', () => {
    // This tests the useEffect synchronization logic.
    // ARRANGE: Do an initial render. The `render` function returns helpful utilities.
    const { rerender } = render(<ProductCard {...defaultProps} />);
    const quantityInput = screen.getByLabelText(/quantity for/i);

    // ASSERT: Initial state is correct.
    expect(quantityInput.value).toBe('1');

    // ACT: Re-render the same component with a new prop value.
    // This simulates the parent component passing down a new quantity.
    rerender(<ProductCard {...defaultProps} initialQuantity={5} />);

    // ASSERT: The input value should have updated to reflect the new prop.
    expect(quantityInput.value).toBe('5');
  });

  it('should allow user to type a quantity directly into the input', async () => {
    const user = userEvent.setup();
    render(<ProductCard {...defaultProps} />);

    const quantityInput = screen.getByLabelText(/quantity for/i);

    // ACT: Simulate a user clearing the input and typing a new value.
    // The 'clear' is important because type() appends by default.
    await user.clear(quantityInput);
    await user.type(quantityInput, '5');

    // ASSERT: The input's value should now be '5'.
    expect(quantityInput.value).toBe('5');
  });
});
