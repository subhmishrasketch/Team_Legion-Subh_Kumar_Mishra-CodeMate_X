import React, { createContext, useContext, useState, useEffect } from "react";

interface ThemeContextType {
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDark, setIsDark] = useState(true); // Always dark mode
  const [mounted, setMounted] = useState(false);

  // Load theme preference from localStorage on mount - ALWAYS DARK
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("dark");
    localStorage.setItem("theme-mode", "dark");
    setMounted(true);
  }, []);

  const applyTheme = (dark: boolean) => {
    const html = document.documentElement;
    // Always apply dark mode
    html.classList.add("dark");
    localStorage.setItem("theme-mode", "dark");
  };

  const toggleTheme = () => {
    // Do nothing - lock to dark mode
    return;
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ isDark: true, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within ThemeProvider");
  }
  return context;
};
