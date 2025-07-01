import userEvent from '@testing-library/user-event';
import { render, screen, within } from '../../tests/test-utils';
import ProductDetailPage from './ProductDetailPage';

// Mock the hooks used by the page at the top level
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Keep all original exports
    useLoaderData: vi.fn(),
    useOutletContext: vi.fn(),
  };
});

import { useLoaderData, useOutletContext } from 'react-router-dom';
import { expect } from 'vitest';

describe('ProductDetailPage', () => {
  let mockHandleAddToCart;

  // Define mock data that we can control in our tests
  const mockProduct = {
    id: 1,
    title: 'Test Hoodie',
    price: 50,
    description: 'A very nice and comfortable hoodie.',
    images: ['image1.jpg', 'image2.jpg', 'image3.jpg'],
    slug: 'test-hoodie',
  };

  const mockRelatedProducts = [
    {
      id: 10,
      title: 'Related Item 1',
      price: 20,
      slug: 'related-1',
      images: ['related1.jpg'],
    },
    {
      id: 11,
      title: 'Related Item 2',
      price: 30,
      slug: 'related-2',
      images: ['related2.jpg'],
    },
  ];

  beforeEach(() => {
    // Reset mocks before each test to ensure a clean slate
    vi.clearAllMocks();
    mockHandleAddToCart = vi.fn();

    // Provide a default mock implementation for the hooks
    useLoaderData.mockReturnValue({
      product: mockProduct,
      related: mockRelatedProducts,
    });
    useOutletContext.mockReturnValue({
      cartItems: [],
      handleAddToCart: mockHandleAddToCart,
    });
  });

  it('renders all product details from the loader data', () => {
    render(<ProductDetailPage />);

    const title = screen.getByRole('heading', { name: /Test Hoodie/i });
    const price = screen.getByText(`$${mockProduct.price}`);
    const description = screen.getByText(
      /A very nice and comfortable hoodie./i,
    );

    expect(title).toBeInTheDocument();
    expect(price).toBeInTheDocument();
    expect(description).toBeInTheDocument();

    const productImg = screen.getByRole('img', { name: 'Test Hoodie' });
    expect(productImg).toHaveAttribute('src', 'image1.jpg');
  });

  it('renders a "Back to Shop" link that points to the /shop path', () => {
    render(<ProductDetailPage />);
    expect(screen.getByRole('link', { name: /back to shop/i })).toHaveAttribute(
      'href',
      '/shop',
    );
  });

  it('switches the main image when a thumbnail is clicked', async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);
    const secondThumbnailBtn = screen.getByRole('button', {
      name: /view image 2/i,
    });

    await user.click(secondThumbnailBtn);

    const productImg = screen.getByRole('img', { name: 'Test Hoodie' });
    expect(productImg).toHaveAttribute('src', 'image2.jpg');
  });

  it('updates the local quantity when increment and decrement buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);
    const mainSection = screen.getByTestId('main-product-section');

    // Find the quantity input using its label name.
    const quantityInput = within(mainSection).getByLabelText('Quantity');
    expect(quantityInput).toHaveValue(1); // It should initialize to 1

    // Find the increase and decrease buttons using their ARIA labels.
    const incrementButton = within(mainSection).getByRole('button', {
      name: /increase quantity/i,
    });
    const decrementButton = within(mainSection).getByRole('button', {
      name: /decrease quantity/i,
    });

    // Click increment
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(2);

    // Click increment again
    await user.click(incrementButton);
    expect(quantityInput).toHaveValue(3);

    // Click decrement
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(2);
  });

  it('displays "Add to Cart" and calls handler correctly when item is NOT in cart', async () => {
    const user = userEvent.setup();
    render(<ProductDetailPage />);

    const mainSection = screen.getByTestId('main-product-section');
    const AddToCartBtn = within(mainSection).getByRole('button', {
      name: /add to cart/i,
    });
    const incrementButton = within(mainSection).getByRole('button', {
      name: /increase quantity/i,
    });

    await user.click(incrementButton); // 2
    await user.click(incrementButton); // 3
    await user.click(AddToCartBtn); // add to cart 3 quantity

    expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct, 3);
  });

  it('displays "Update Cart" and calls handler correctly when item IS in cart', async () => {
    const user = userEvent.setup();
    // Mock useOutletContext to simulate the item being in the cart
    useOutletContext.mockReturnValue({
      cartItems: [{ ...mockProduct, quantity: 3 }], // Item already in cart with quantity 2
      handleAddToCart: mockHandleAddToCart,
    });
    render(<ProductDetailPage />);
    const mainSection = screen.getByTestId('main-product-section');
    const UpdateCartBtn = within(mainSection).getByRole('button', {
      name: /update cart/i,
    });
    const incrementButton = within(mainSection).getByRole('button', {
      name: /increase quantity/i,
    });
    const decrementButton = within(mainSection).getByRole('button', {
      name: /decrease quantity/i,
    });
    const quantityInput = within(mainSection).getByLabelText('Quantity');

    expect(quantityInput).toHaveValue(3);

    await user.click(decrementButton);
    await user.click(UpdateCartBtn);

    expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct, 2);

    await user.click(incrementButton);
    await user.click(incrementButton);
    await user.click(UpdateCartBtn);

    expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct, 4);
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(2);
  });

  it('handles removing an item by updating quantity to 0', async () => {
    const user = userEvent.setup();
    const { rerender } = render(<ProductDetailPage />);

    // Item is in the cart initially
    useOutletContext.mockReturnValue({
      cartItems: [{ ...mockProduct, quantity: 2 }],
      handleAddToCart: mockHandleAddToCart,
    });
    rerender(<ProductDetailPage />);

    const purchaseBox = screen
      .getByLabelText('Quantity')
      .closest('div[class*="_purchaseBox"]');
    const quantityInput = within(purchaseBox).getByLabelText('Quantity');
    const decrementButton = within(purchaseBox).getByRole('button', {
      name: /decrease quantity/i,
    });
    const updateButton = within(purchaseBox).getByRole('button', {
      name: /update cart/i,
    });

    expect(quantityInput).toHaveValue(2);

    // User decrements local quantity to 0
    await user.click(decrementButton);
    await user.click(decrementButton);
    expect(quantityInput).toHaveValue(0);

    // User clicks "Update Cart", which now acts as a "Remove"
    await user.click(updateButton);

    // Assert the handler was called with quantity 0
    expect(mockHandleAddToCart).toHaveBeenCalledTimes(1);
    expect(mockHandleAddToCart).toHaveBeenCalledWith(mockProduct, 0);

    // Simulate the context update - the item is now gone from the cart
    useOutletContext.mockReturnValue({
      cartItems: [], // Cart is now empty
      handleAddToCart: mockHandleAddToCart,
    });
    rerender(<ProductDetailPage />);

    // Assert the UI has reverted to the "Add to Cart" state
    expect(
      within(purchaseBox).getByRole('button', { name: /add to cart/i }),
    ).toBeInTheDocument();
    expect(
      within(purchaseBox).queryByRole('button', { name: /update cart/i }),
    ).not.toBeInTheDocument();
    // The quantity should reset to 1 as per the component's useEffect logic
    expect(within(purchaseBox).getByLabelText('Quantity')).toHaveValue(1);
  });

  it('renders the related products section with items from the loader', () => {
    render(<ProductDetailPage />);
    expect(
      screen.getByRole('heading', { name: /you might also like/i }),
    ).toBeInTheDocument();
    // Assert the correct number of related ProductCards are rendered
    expect(screen.getAllByRole('article')).toHaveLength(
      mockRelatedProducts.length,
    );

    // Check for the titles of the related products
    mockRelatedProducts.forEach((item) => {
      expect(
        screen.getByRole('heading', { name: item.title }),
      ).toBeInTheDocument();
    });
  });
});
