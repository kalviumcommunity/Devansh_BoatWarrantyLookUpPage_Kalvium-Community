import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'boat-red': '#ED1C24',
        'boat-red-dark': '#C6151C',
        'boat-black': '#0A0A0A',
        'boat-ink': '#17181B',
        'boat-panel': '#F4F5F7',
        'boat-border': '#E4E6EA',
        'boat-muted': '#6B7280',
        'boat-green': '#16A34A',
        'boat-green-bg': '#E9F9EF',
        'boat-red-bg': '#FDEAEA',
        'boat-amber': '#B45309',
        'boat-amber-bg': '#FEF3E0',
      },
      borderRadius: {
        lg: '16px',
        md: '12px',
        sm: '8px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(16,18,23,0.04), 0 8px 24px -12px rgba(16,18,23,0.12)',
        card: '0 1px 2px rgba(16,18,23,0.03), 0 2px 8px rgba(16,18,23,0.05)',
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        sora: ['Sora', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
