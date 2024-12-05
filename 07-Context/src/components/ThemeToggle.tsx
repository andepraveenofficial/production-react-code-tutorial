import { CSSProperties } from 'react';
import { useTheme } from '../contexts/ThemeContext';

export function ThemeToggle() {
  const { theme, toggleTheme, styles } = useTheme();

  const themeStyles:CSSProperties = {
    padding: '8px 16px',
    backgroundColor: styles.secondary,
    color: styles.text,
    border: `1px solid ${styles.border}`,
    borderRadius: '4px',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'all 0.2s ease'
  };
  
  return (
    <button
      onClick={toggleTheme}
      style={themeStyles}
    >
      {theme === 'light' ? '🌙' : '☀️'}
      Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
    </button>
  );
}
