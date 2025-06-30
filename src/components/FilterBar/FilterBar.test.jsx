import userEvent from '@testing-library/user-event';
import { render, screen, within } from '../../tests/test-utils';
import FilterBar from './FilterBar';
import styles from './FilterBar.module.css';
import { expect } from 'vitest';

describe('FilterBar', () => {
  let onSearchChange, onCategoryChange;
  const categories = [
    'All',
    'Clothes',
    'Electronics',
    'Furniture',
    'Shoes',
    'Miscellaneous',
  ];

  beforeEach(() => {
    onSearchChange = vi.fn();
    onCategoryChange = vi.fn();
  });

  it('renders the search input with the correct placeholder and controlled value', () => {
    render(
      <FilterBar
        searchTerm="hoodie"
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory="All"
        onCategoryChange={onCategoryChange}
      />,
    );

    const input = screen.getByRole('searchbox', { name: /search products/i });

    expect(input).toHaveAttribute('placeholder', 'Search for products...');
    expect(input).toHaveValue('hoodie');
  });

  it('renders the search input with the empty placeholder and controlled value', () => {
    render(
      <FilterBar
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory="All"
        onCategoryChange={onCategoryChange}
      />,
    );

    const input = screen.getByRole('searchbox', { name: /search products/i });

    expect(input).toHaveAttribute('placeholder', 'Search for products...');
    expect(input).toHaveValue('');
  });

  it('calls onSearchChange each time the user types into the search input', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        searchTerm=""
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory=""
        onCategoryChange={onCategoryChange}
      />,
    );

    const input = screen.getByRole('searchbox', { name: /search products/i });
    await user.type(input, 'cap');

    // Should fire once per character
    expect(onSearchChange).toHaveBeenCalledTimes(3);

    // Each change event comes from our input
    onSearchChange.mock.calls.forEach(([event]) => {
      expect(event.target).toBe(input);
    });
  });

  it('renders one button per category and displays each category name', () => {
    render(
      <FilterBar
        searchTerm=""
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory=""
        onCategoryChange={onCategoryChange}
      />,
    );

    const categoryFilters = screen.getByTestId('category-filters');
    expect(within(categoryFilters).getAllByRole('button').length).toBe(6);

    categories.forEach((category) => {
      const button = screen.getByRole('button', { name: category });
      expect(button).toBeInTheDocument();
    });
  });

  it('applies the active CSS class to the button matching selectedCategory', () => {
    render(
      <FilterBar
        searchTerm=""
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory="Clothes"
        onCategoryChange={onCategoryChange}
      />,
    );

    // the clothes button should have active class
    const categoryButton = screen.getByRole('button', { name: /clothes/i });
    expect(categoryButton).toHaveClass(styles.active);

    // all other buttons should not have active class
    categories
      .filter((cat) => cat !== 'Clothes')
      .forEach((cat) => {
        const btn = screen.getByRole('button', { name: cat });
        expect(btn).not.toHaveClass(styles.active);
      });
  });

  it('calls onCategoryChange with the correct category when a button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <FilterBar
        searchTerm=""
        onSearchChange={onSearchChange}
        categories={categories}
        selectedCategory="All"
        onCategoryChange={onCategoryChange}
      />,
    );

    const clothesBtn = screen.getByRole('button', { name: /clothes/i });
    const allBtn = screen.getByRole('button', { name: /^all$/i });

    await user.click(clothesBtn);
    await user.click(allBtn);

    expect(onCategoryChange).toHaveBeenCalledTimes(2);
    expect(onCategoryChange).toHaveBeenNthCalledWith(1, 'Clothes');
    expect(onCategoryChange).toHaveBeenNthCalledWith(2, 'All');
  });

  it('renders no category buttons when categories array is empty', () => {
    render(
      <FilterBar
        searchTerm=""
        onSearchChange={onSearchChange}
        categories={[]}
        selectedCategory=""
        onCategoryChange={onCategoryChange}
      />,
    );

    const container = screen.getByTestId('category-filters');
    expect(within(container).queryAllByRole('button')).toHaveLength(0);
  });
});
