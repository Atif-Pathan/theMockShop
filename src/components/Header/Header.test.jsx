import React from 'react';
import { describe, it, beforeEach, expect, vi } from 'vitest';
import { render, screen, within } from '../../tests/test-utils';
import userEvent from '@testing-library/user-event';
import * as ThemeContext from '../../contexts/ThemeContext';
import Header from './Header';

describe('Header', () => {
  const toggleThemeMock = vi.fn();

  beforeEach(() => {
    // Reset any HTML classes & mock return of useTheme
    document.documentElement.className = '';
    toggleThemeMock.mockClear();
    vi.spyOn(ThemeContext, 'useTheme').mockReturnValue({
      theme: 'light',
      toggleTheme: toggleThemeMock,
    });
  });

  it('renders the brand logo linking to "/"', () => {
    render(<Header numberOfItems={0} />);
    const logo = screen.getByRole('link', { name: /the edit/i });
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '/');
  });

  it('renders desktop nav links and theme-toggle', () => {
    render(<Header numberOfItems={0} />);
    const desktopNav = screen.getByRole('navigation', {
      name: /main nav/i,
    });

    const home = within(desktopNav).getByRole('link', { name: /home/i });
    expect(home).toBeInTheDocument();
    expect(home).toHaveAttribute('href', '/');

    const shop = within(desktopNav).getByRole('link', { name: /shop/i });
    expect(shop).toBeInTheDocument();
    expect(shop).toHaveAttribute('href', '/shop');

    const cart = within(desktopNav).getByRole('link', { name: /cart/i });
    expect(cart).toBeInTheDocument();
    expect(cart).toHaveAttribute('href', '/cart');

    expect(
      within(desktopNav).getByRole('button', { name: /dark theme/i }),
    ).toBeInTheDocument();
  });

  it('renders mobile controls: theme toggle and hamburger button', () => {
    render(<Header numberOfItems={0} />);
    const themeButtons = screen.getAllByRole('button', {
      name: /dark theme/i,
    });
    expect(themeButtons).toHaveLength(2);

    const hamburger = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(hamburger).toHaveAttribute('aria-controls', 'mobile-navigation');
  });

  it('hides cart badge when numberOfItems is 0', () => {
    render(<Header numberOfItems={0} />);
    expect(
      screen.queryByLabelText(/\d+ items in cart/i),
    ).not.toBeInTheDocument();
  });

  it('shows desktop cart badge when numberOfItems > 0', () => {
    render(<Header numberOfItems={3} />);
    const desktopNav = screen.getByRole('navigation', {
      name: /main navigation/i,
    });
    const badge = within(desktopNav).getByLabelText(/3 items in cart/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('3');
  });

  it('shows mobile cart badge when closed and numberOfItems > 0', () => {
    render(<Header numberOfItems={5} />);
    const hamburger = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    const wrapper = hamburger.parentElement;
    const badge = within(wrapper).getByLabelText(/5 items in cart/i);
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('hides the mobile cart badge once the menu is opened', async () => {
    const user = userEvent.setup();
    render(<Header numberOfItems={2} />);
    const hamburger = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });
    await user.click(hamburger);
    const wrapper = hamburger.parentElement;
    expect(within(wrapper).queryByLabelText(/items in cart/i)).toBeNull();
  });

  it('toggles the mobile-menu-open class on <html> when hamburger clicked', async () => {
    const user = userEvent.setup();
    render(<Header numberOfItems={0} />);
    const hamburger = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });

    // Open
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');
    expect(
      document.documentElement.classList.contains('mobile-menu-open'),
    ).toBe(true);

    // Close
    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(
      document.documentElement.classList.contains('mobile-menu-open'),
    ).toBe(false);
  });

  it('closes the mobile menu (and removes class) when a mobile link is clicked', async () => {
    const user = userEvent.setup();
    render(<Header numberOfItems={0} />);
    const hamburger = screen.getByRole('button', {
      name: /toggle navigation menu/i,
    });

    await user.click(hamburger);
    expect(hamburger).toHaveAttribute('aria-expanded', 'true');

    const mobileNav = screen.getByRole('navigation', {
      name: /mobile navigation/i,
    });
    const shopLink = within(mobileNav).getByRole('link', { name: /shop/i });
    await user.click(shopLink);

    expect(hamburger).toHaveAttribute('aria-expanded', 'false');
    expect(
      document.documentElement.classList.contains('mobile-menu-open'),
    ).toBe(false);
  });

  it('calls toggleTheme when desktop and mobile theme buttons are clicked', async () => {
    const user = userEvent.setup();
    render(<Header numberOfItems={1} />);

    const buttons = screen.getAllByRole('button', {
      name: /switch to dark theme/i,
    });
    await user.click(buttons[0]);
    await user.click(buttons[1]);

    expect(toggleThemeMock).toHaveBeenCalledTimes(2);
  });
});
