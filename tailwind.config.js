/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,tsx}',
    './src/components/**/*.{js,ts,tsx}',
    'global.css',
    './App.{js,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        foreground: '#0a0a0a',
        card: '#ffffff',
        cardForeground: '#0a0a0a',
        popover: '#ffffff',
        popoverForeground: '#0a0a0a',
        primary: '#1d6bf5',
        primaryForeground: '#fafafa',
        secondary: '#f4f4f5',
        secondaryForeground: '#27272a',
        muted: '#f4f4f5',
        mutedForeground: '#71717a',
        accent: '#e4e4e7',
        accentForeground: '#3f3f46',
        destructive: '#ef4444',
        destructiveForeground: '#fafafa',
        border: '#e4e4e7',
        input: '#e4e4e7',
        ring: '#3b82f6',
      },
    },
  },
  plugins: [],
};
