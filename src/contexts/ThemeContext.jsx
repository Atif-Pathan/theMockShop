// src/contexts/ThemeContext.jsx

import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// 1. Create the context
const ThemeContext = createContext();

// 2. Create the provider component
export function ThemeProvider({ children }) {
  // Get the initial theme from localStorage or default to 'light'
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light',
  );

  // 3. Effect to apply the theme class and save to localStorage
  useEffect(() => {
    document.documentElement.className = theme;
    localStorage.setItem('theme', theme);
    const faviconLink = document.getElementById('theme-favicon');
    if (faviconLink) {
      faviconLink.href =
        theme === 'dark'
          ? '/assets/dark-favicon.png' // Path to your dark theme favicon
          : '/assets/light-favicon.png'; // Path to your light theme favicon
    }
  }, [theme]);

  // 4. Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  // 5. Provide the theme and toggle function to children
  const value = { theme, toggleTheme };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// 6. Create a custom hook for easy access to the context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
