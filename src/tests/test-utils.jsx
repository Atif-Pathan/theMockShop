// src/tests/test-utils.jsx
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '../contexts/ThemeContext';

// This is our custom render function that wraps components with all necessary providers
const renderWithProviders = (ui, { route = '/', ...renderOptions } = {}) => {
  // Wrap the UI in all providers
  const AllTheProviders = ({ children }) => {
    return (
      <ThemeProvider>
        {/* Set initialEntries to handle the starting route */}
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </ThemeProvider>
    );
  };

  return render(ui, { wrapper: AllTheProviders, ...renderOptions });
};

// Re-export everything from RTL
export * from '@testing-library/react';
// Override the default render method with our custom one
export { renderWithProviders as render };
