/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F59E0B',
          light: '#FB923C',
        },
        secondary: '#22C55E',
        'slate-ink': '#0F172A',
        surface: '#F8FAFC',
        cream: '#F5F0E6',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        soft: '0 10px 40px -12px rgba(15, 23, 42, 0.12)',
        glow: '0 0 24px rgba(245, 158, 11, 0.45)',
      },
    },
  },
  plugins: [],
}
