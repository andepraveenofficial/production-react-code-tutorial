// Define theme types
export type Theme = 'light' | 'dark';

export interface ThemeStyles {
  background: string;
  text: string;
  primary: string;
  secondary: string;
  border: string;
}

// Define theme styles
export const themeStyles: Record<Theme, ThemeStyles> = {
  light: {
    background: "#ffffff",
    text: "#333333",
    primary: "#1a73e8",
    secondary: "#f1f3f4",
    border: "#dadce0",
  },
  dark: {
    background: "#1f1f1f",
    text: "#ffffff",
    primary: "#4d90fe",
    secondary: "#2d2d2d",
    border: "#5f6368",
  },
} as const;
