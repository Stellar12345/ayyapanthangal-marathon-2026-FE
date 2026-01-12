/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary Blue
        'primary-blue': '#1E5ED8',
        'primary-blue-dark': '#1a4fc2',
        'primary-blue-light': '#3b7eff',
        // CTA Red
        'cta-red': '#E53935',
        'cta-red-dark': '#c62828',
        'cta-red-light': '#ef5350',
        // Accent Orange
        'accent-orange': '#FB8C00',
        'accent-orange-dark': '#e65100',
        'accent-orange-light': '#ff9800',
        // Highlight Gold
        'highlight-gold': '#F9A825',
        'highlight-gold-dark': '#f57f17',
        'highlight-gold-light': '#fbc02d',
        // Success Green
        'success-green': '#2E7D32',
        'success-green-dark': '#1b5e20',
        'success-green-light': '#4caf50',
        // Light Background
        'light-bg': '#F5F7FA',
        // Dark Text
        'dark-text': '#1C1C1C',
        // White
        'white': '#FFFFFF',
        // Legacy names for backward compatibility
        'marathon-blue': '#1E5ED8',
        'marathon-red': '#E53935',
        'marathon-orange': '#FB8C00',
        'marathon-gold': '#F9A825',
        'marathon-green': '#2E7D32',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
