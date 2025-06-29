import React from 'react';
import { render, act, cleanup } from '@testing-library/react';
import { ThemeProvider, useTheme } from './ThemeContext';

// A little helper consumer that grabs the hook return value
let hookValue;
function TestConsumer() {
  hookValue = useTheme();
  return null;
}

beforeEach(() => {
  // Ensure a clean slate each time
  window.localStorage.clear();
  document.documentElement.className = '';
});
afterEach(cleanup);

describe('ThemeContext & useTheme()', () => {
  it('defaults to "light", writes to localStorage and to <html>.className', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(hookValue.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.className).toBe('light');
  });

  it('reads initial theme from localStorage if present', () => {
    // Arrange
    localStorage.setItem('theme', 'dark');

    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    expect(hookValue.theme).toBe('dark');
    expect(document.documentElement.className).toBe('dark');
  });

  it('toggleTheme() flips theme, persists to localStorage, and updates <html>.className', () => {
    render(
      <ThemeProvider>
        <TestConsumer />
      </ThemeProvider>,
    );

    // light → dark
    act(() => {
      hookValue.toggleTheme();
    });
    expect(hookValue.theme).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
    expect(document.documentElement.className).toBe('dark');

    // dark → light
    act(() => {
      hookValue.toggleTheme();
    });
    expect(hookValue.theme).toBe('light');
    expect(localStorage.getItem('theme')).toBe('light');
    expect(document.documentElement.className).toBe('light');
  });
});
