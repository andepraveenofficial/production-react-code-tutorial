import { createContext, useContext, ReactNode, useState, useEffect, useMemo } from 'react';
import { Theme, ThemeStyles, themeStyles } from './themeConstants';

// Define the context value type
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  styles: ThemeStyles;
}

// Create context with a default value
const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Create provider component
interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: Theme;
}

export function ThemeProvider({ children, initialTheme = 'light' }: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    const savedTheme = localStorage.getItem('theme');
    return (savedTheme as Theme) || initialTheme;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.body.style.backgroundColor = themeStyles[theme].background;
    document.body.style.color = themeStyles[theme].text;
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const value = useMemo(() => ({ theme, toggleTheme, styles: themeStyles[theme] }), [theme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

// Custom hook for using the theme context
export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
