import userEvent from '@testing-library/user-event';
import { fireEvent } from '@testing-library/react';
import { render, screen, within } from '../../tests/test-utils';
import CartItem from './CartItem';

describe('CartItem', () => {
  const baseItem = {
    id: 42,
    slug: 'test-product',
    title: 'Test Product',
    price: 10,
    quantity: 2,
    images: ['https://example.com/img1.jpg'],
  };

  let handleUpdateQuantity, handleRemoveItem;

  beforeEach(() => {
    handleUpdateQuantity = vi.fn();
    handleRemoveItem = vi.fn();
  });

  it('renders the product image wrapped in a link to the detail page', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const img = screen.getByRole('img', { name: /test product/i });
    expect(img).toBeInTheDocument();
    expect(img).toHaveAttribute('src', baseItem.images[0]);

    const link = img.closest('a');
    expect(link).toHaveAttribute('href', `/shop/${baseItem.slug}`);
  });

  it('renders the title as a link to the detail page', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const heading = screen.getByRole('heading', { name: /test product/i });
    expect(heading).toBeInTheDocument();

    const link = heading.closest('a');
    expect(link).toHaveAttribute('href', `/shop/${baseItem.slug}`);
  });

  it('displays price and subtotal correctly (number‐focused & scoped)', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );

    const title = screen.getByRole('heading', { name: /test product/i });
    const cartItemEl = title.closest('article');

    // Price assertion
    expect(
      within(cartItemEl).getByText(
        new RegExp(`\\$${baseItem.price}\\s+each`, 'i'),
        { selector: 'p' },
      ),
    ).toBeInTheDocument();

    // Subtotal assertion
    expect(
      within(cartItemEl).getByText(
        new RegExp(
          `Subtotal:\\s*\\$${baseItem.price * baseItem.quantity}`,
          'i',
        ),
        { selector: 'p' },
      ),
    ).toBeInTheDocument();
  });

  it('initializes the quantity input with the item quantity', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const input = screen.getByLabelText(/quantity for test product/i);
    expect(input).toHaveValue(baseItem.quantity);
  });

  it('outputs an input with min="1" and an id tied to the hidden label', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    // Find via its accessible name
    const input = screen.getByRole('spinbutton', {
      name: /quantity for test product/i,
    });
    // ID should match the label’s htmlFor
    expect(input).toHaveAttribute('id', `quantity-${baseItem.id}`);
    // And it should carry your min=1 constraint
    expect(input).toHaveAttribute('min', '1');
  });

  it('increments quantity by 1 when "+" is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const incBtn = screen.getByRole('button', { name: /increase quantity/i });
    await user.click(incBtn);

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(
      baseItem.id,
      baseItem.quantity + 1,
    );
  });

  it('decrements quantity by 1 when "-" is clicked', async () => {
    const user = userEvent.setup();
    // First with quantity = 2
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(decBtn);

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(
      baseItem.id,
      baseItem.quantity - 1,
    );
  });

  it('cannot decrement quantity below 1', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={{ ...baseItem, quantity: 1 }}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const input = screen.getByLabelText(/quantity for test product/i);
    const decBtn = screen.getByRole('button', { name: /decrease quantity/i });
    await user.click(decBtn);
    expect(handleUpdateQuantity).toHaveBeenCalledTimes(0);
    expect(handleUpdateQuantity).not.toHaveBeenCalled();
    expect(input).toHaveValue(1);
  });

  it('does not call handleUpdateQuantity when input is cleared', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const input = screen.getByLabelText(/quantity for test product/i);
    await user.clear(input);
    expect(handleUpdateQuantity).not.toHaveBeenCalled();
  });

  it('calls handleUpdateQuantity(id, newQty) when user enters a valid quantity (>=1)', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );

    const heading = screen.getByRole('heading', { name: /test product/i });
    const cartItemEl = heading.closest('article');
    const input = within(cartItemEl).getByRole('spinbutton', {
      name: /quantity for test product/i,
    });

    // Simulate user typing "3"
    fireEvent.change(input, { target: { value: '3' } });

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(baseItem.id, 3);
  });

  it('does NOT call handleUpdateQuantity when user enters an invalid quantity (<1)', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );

    const heading = screen.getByRole('heading', { name: /test product/i });
    const cartItemEl = heading.closest('article');
    const input = within(cartItemEl).getByRole('spinbutton', {
      name: /quantity for test product/i,
    });

    // Simulate user typing "0"
    fireEvent.change(input, { target: { value: '0' } });

    expect(handleUpdateQuantity).not.toHaveBeenCalled();
  });

  it('treats a change event of "25" as quantity 25 (appended digit)', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );

    const input = screen.getByRole('spinbutton', {
      name: /quantity for test product/i,
    });

    // Simulate user appending '5' to the '2' that was already there:
    fireEvent.change(input, { target: { value: '25' } });

    expect(handleUpdateQuantity).toHaveBeenCalledTimes(1);
    expect(handleUpdateQuantity).toHaveBeenCalledWith(baseItem.id, 25);
  });

  it('fires on *each* change event: "21" then "215"', () => {
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );

    const input = screen.getByRole('spinbutton', {
      name: /quantity for test product/i,
    });

    // First append '1' → "21"
    fireEvent.change(input, { target: { value: '21' } });
    // Then append '5' → "215"
    fireEvent.change(input, { target: { value: '215' } });

    expect(handleUpdateQuantity.mock.calls).toEqual([
      [baseItem.id, 21],
      [baseItem.id, 215],
    ]);
  });

  it('calls handleRemoveItem when the trash button is clicked', async () => {
    const user = userEvent.setup();
    render(
      <CartItem
        item={baseItem}
        handleUpdateQuantity={handleUpdateQuantity}
        handleRemoveItem={handleRemoveItem}
      />,
    );
    const removeBtn = screen.getByRole('button', {
      name: /remove test product from cart/i,
    });
    await user.click(removeBtn);
    expect(handleRemoveItem).toHaveBeenCalledTimes(1);
    expect(handleRemoveItem).toHaveBeenCalledWith(baseItem.id);
  });
});
