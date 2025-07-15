// src/store/themeStore.js
import { create } from 'zustand';

export const useThemeStore = create((set) => {
  // Load saved or system theme on init
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');

  // Set class on html
  document.documentElement.classList.toggle('dark', initialTheme === 'dark');

  return {
    theme: initialTheme,

    toggleTheme: () =>
      set((state) => {
        const newTheme = state.theme === 'dark' ? 'light' : 'dark';

        // Save + apply theme
        localStorage.setItem('theme', newTheme);
        document.documentElement.classList.toggle('dark', newTheme === 'dark');

        return { theme: newTheme };
      }),
  };
});
