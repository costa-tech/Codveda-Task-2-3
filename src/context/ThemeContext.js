import React, { createContext, useState, useContext } from 'react';

// Create a context for our theme
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

// Theme provider component
export const ThemeProvider = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  // Toggle between light and dark theme
  const toggleTheme = () => {
    setIsDarkTheme(prevTheme => !prevTheme);
  };

  // Theme values to be provided
  const theme = {
    isDarkTheme,
    toggleTheme,
    colors: isDarkTheme 
      ? {
          background: '#121212',
          surface: '#1e1e1e',
          primary: '#6f7dfb',
          secondary: '#fb7c6f',
          text: '#ffffff',
          textSecondary: '#cccccc'
        } 
      : {
          background: '#ffffff',
          surface: '#f5f8ff',
          primary: '#4a6cf7',
          secondary: '#fb7c6f',
          text: '#333333',
          textSecondary: '#666666'
        }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {typeof children === 'function' ? children(theme) : children}
    </ThemeContext.Provider>
  );
};