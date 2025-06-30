// src/pages/ShopPage/ShopPage.test.jsx
import { describe, it, beforeEach, vi, expect } from 'vitest';
import userEvent from '@testing-library/user-event';
// We import fireEvent specifically for testing the result of a direct input change
import { render, screen, within, fireEvent } from '../../tests/test-utils';
import ShopPage from './ShopPage';

// Mock the hooks used by the page at the top level
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual, // Keep all original exports
    useLoaderData: vi.fn(),
    useOutletContext: vi.fn(),
    useSearchParams: vi.fn(),
  };
});

import {
  useLoaderData,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';

// Define mock data outside of describe for reusability
const mockProducts = [
  {
    id: 1,
    title: 'Classic Red Pullover Hoodie',
    slug: 'classic-red-pullover-hoodie',
    price: 10,
    category: { id: 1, name: 'Clothes' },
    images: ['hoodie.jpg'],
  },
  {
    id: 2,
    title: 'Sleek Wireless Computer Mouse',
    slug: 'sleek-wireless-computer-mouse',
    price: 69,
    category: { id: 2, name: 'Electronics' },
    images: ['mouse.jpg'],
  },
  {
    id: 3,
    title: 'Modern Leather Sofa',
    slug: 'modern-leather-sofa',
    price: 53,
    category: { id: 3, name: 'Furniture' },
    images: ['sofa.jpg'],
  },
  {
    id: 4,
    title: 'Classic Grey Hoodie',
    slug: 'classic-grey-hoodie',
    price: 69,
    category: { id: 1, name: 'Clothes' },
    images: ['grey-hoodie.jpg'],
  },
];

describe('ShopPage', () => {
  let mockSetSearchParams;
  let mockHandleAddToCart;

  beforeEach(() => {
    vi.clearAllMocks();
    mockSetSearchParams = vi.fn();
    mockHandleAddToCart = vi.fn();

    useLoaderData.mockReturnValue(mockProducts);
    useOutletContext.mockReturnValue({
      cartItems: [],
      handleAddToCart: mockHandleAddToCart,
    });
    useSearchParams.mockReturnValue([
      new URLSearchParams(),
      mockSetSearchParams,
    ]);
  });

  // This test verifies that the page correctly renders its static title and
  // displays a product card for every item provided by the loader data.
  it('renders the page title and all products returned from the loader', () => {
    render(<ShopPage />);
    expect(
      screen.getByRole('heading', { name: /the collection/i }),
    ).toBeInTheDocument();
    expect(screen.getAllByRole('article')).toHaveLength(mockProducts.length);
    mockProducts.forEach((product) => {
      expect(
        screen.getByRole('heading', { name: product.title }),
      ).toBeInTheDocument();
    });
  });

  // This test ensures the component correctly interprets URL state by mocking
  // useSearchParams to return a pre-set category filter.
  it('filters products based on the "category" search param', () => {
    useSearchParams.mockReturnValue([
      new URLSearchParams('category=Electronics'),
      mockSetSearchParams,
    ]);
    render(<ShopPage />);
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: /Sleek Wireless Computer Mouse/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Classic Red Pullover Hoodie/i }),
    ).not.toBeInTheDocument();
  });

  // This test ensures the component correctly interprets URL state by mocking
  // useSearchParams to return a pre-set search query.
  it('filters products based on the "q" (search) search param', () => {
    useSearchParams.mockReturnValue([
      new URLSearchParams('q=hoodie'),
      mockSetSearchParams,
    ]);
    render(<ShopPage />);
    expect(screen.getAllByRole('article')).toHaveLength(2);
    expect(
      screen.getByRole('heading', { name: /Classic Red Pullover Hoodie/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /Classic Grey Hoodie/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Sleek Wireless Computer Mouse/i }),
    ).not.toBeInTheDocument();
  });

  // This test verifies the integration between the FilterBar and the ShopPage,
  // ensuring that clicking a category button triggers a state update.
  it('calls setSearchParams with the correct category when a category button is clicked', async () => {
    const user = userEvent.setup();
    render(<ShopPage />);
    const electronicsButton = screen.getByRole('button', {
      name: /electronics/i,
    });
    await user.click(electronicsButton);
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const paramsPassedToSet = mockSetSearchParams.mock.calls[0][0];
    expect(paramsPassedToSet.get('category')).toBe('Electronics');
  });

  // This test verifies that the component's onChange handler works correctly
  // by simulating a single change event with the final desired value.
  it('calls setSearchParams with the correct query when text is entered in the search input', () => {
    render(<ShopPage />);
    const searchInput = screen.getByRole('searchbox', {
      name: /search products/i,
    });

    // Use fireEvent.change to simulate the final state of the input.
    // This is the most reliable way to test the handler in isolation.
    fireEvent.change(searchInput, { target: { value: 'mouse' } });

    // Assert that the handler was called once with the final value.
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const paramsPassedToSet = mockSetSearchParams.mock.calls[0][0];
    expect(paramsPassedToSet.get('q')).toBe('mouse');
  });

  // This test covers the edge case where no products match the filters,
  // ensuring the user receives appropriate feedback.
  it('displays a "no products match" message when filters yield no results', () => {
    useLoaderData.mockReturnValue([]);
    render(<ShopPage />);
    expect(
      screen.getByRole('heading', { name: /no products match/i }),
    ).toBeInTheDocument();
  });

  // This test verifies that the page correctly uses context from a parent component
  // to pass the right props down to its children (ProductCard).
  it('passes correct isInCart and initialQuantity props to ProductCard', () => {
    useOutletContext.mockReturnValue({
      cartItems: [{ id: 1, quantity: 3 }],
      handleAddToCart: mockHandleAddToCart,
    });
    render(<ShopPage />);
    const hoodieHeading = screen.getByRole('heading', {
      name: /classic red pullover hoodie/i,
    });
    const hoodieCard = hoodieHeading.closest('article');
    expect(
      within(hoodieCard).getByRole('button', { name: /update/i }),
    ).toBeInTheDocument();
    expect(
      within(hoodieCard).getByLabelText(
        /quantity for classic red pullover hoodie/i,
      ),
    ).toHaveValue(3);
  });

  // This test ensures that multiple filters applied via URL params work together correctly.
  it('filters products based on both category and search query params', () => {
    useSearchParams.mockReturnValue([
      new URLSearchParams('category=Clothes&q=red'),
      mockSetSearchParams,
    ]);
    render(<ShopPage />);
    expect(screen.getAllByRole('article')).toHaveLength(1);
    expect(
      screen.getByRole('heading', { name: /Classic Red Pullover Hoodie/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('heading', { name: /Classic Grey Hoodie/i }),
    ).not.toBeInTheDocument();
  });

  // This test verifies the user flow of clearing a filter by clicking "All".
  it('clears the category filter when the "All" button is clicked', async () => {
    const user = userEvent.setup();
    useSearchParams.mockReturnValue([
      new URLSearchParams('category=Electronics'),
      mockSetSearchParams,
    ]);
    render(<ShopPage />);
    const allButton = screen.getByRole('button', { name: 'All' });
    await user.click(allButton);
    expect(mockSetSearchParams).toHaveBeenCalledTimes(1);
    const paramsPassedToSet = mockSetSearchParams.mock.calls[0][0];
    expect(paramsPassedToSet.has('category')).toBe(false);
  });
});
