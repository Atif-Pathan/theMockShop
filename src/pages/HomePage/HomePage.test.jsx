// src/pages/HomePage/HomePage.test.jsx
import { describe, expect, it } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('renders the main headline and subheadline', () => {
    // 1. Render the <HomePage /> component.
    render(<HomePage />);
    // 2. Use getByRole('heading', { name: /your essential style/i }) to find the main title.
    // 3. Use getByText(/welcome to the edit/i) to find the subheadline.
    const mainTitle = screen.getByRole('heading', {
      name: /your essential style/i,
    });

    // 4. Assert that both are in the document.
    expect(mainTitle).toBeInTheDocument();
    expect(
      screen.getByText((content, element) => {
        return (
          element.tagName.toLowerCase() === 'p' &&
          content.includes('Welcome to')
        );
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/the edit/i, { selector: 'span' }),
    ).toBeInTheDocument();
  });

  it('renders the "Explore The Collection" CTA button linking to the shop', () => {
    render(<HomePage />);
    const exploreButton = screen.getByRole('button', { name: /explore/i });
    const link = exploreButton.closest('a');
    expect(link).toHaveAttribute('href', '/shop');
  });

  it('renders the mouse-glow element for the visual effect', () => {
    render(<HomePage />);
    // Use data-testid for elements that don't have semantic roles or unique text
    expect(screen.getByTestId('mouse-glow')).toBeInTheDocument();
  });
});
