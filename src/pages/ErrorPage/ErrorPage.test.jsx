// src/pages/ErrorPage/ErrorPage.test.jsx
import { describe, expect, it, vi } from 'vitest';
import { render, screen } from '../../tests/test-utils';
import ErrorPage from './ErrorPage';

// Mock the hook at the top level
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useRouteError: vi.fn(),
    Link: actual.Link, // Ensure the real Link component is used
  };
});

import { useRouteError } from 'react-router-dom';

describe('ErrorPage', () => {
  it('displays a 404 message when the route error has status 404', () => {
    useRouteError.mockReturnValue({ status: 404 });
    render(<ErrorPage />);
    expect(
      screen.getByRole('heading', { name: /Not Found/i }),
    ).toBeInTheDocument();
  });
  it('displays a generic error message for other error statuses', () => {
    useRouteError.mockReturnValue({
      status: 500,
      statusText: 'Internal Server Error',
    });
    render(<ErrorPage />);
    expect(
      screen.getByRole('heading', { name: /error 500/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/internal Server Error/i)).toBeInTheDocument();
  });
  it('displays a generic error message for random error statuses that might be custom or have no status text', () => {
    useRouteError.mockReturnValue({
      status: 505,
    });
    render(<ErrorPage />);
    expect(
      screen.getByRole('heading', { name: /error 505/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Could not find the requested resource/i),
    ).toBeInTheDocument();
  });
  it('renders a "Back to Homepage" link that points to the root path', () => {
    useRouteError.mockReturnValue({});
    render(<ErrorPage />);
    const backBtn = screen.getByRole('link', { name: /homepage/i });
    expect(backBtn).toBeInTheDocument();
    expect(backBtn).toHaveAttribute('href', '/');
  });
});
