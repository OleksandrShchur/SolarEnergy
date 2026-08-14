/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#F0A61F',
          light: '#F6C85A',
        },
        secondary: '#E07B3A',
        'slate-ink': '#15120E',
        surface: '#F3EBDC',
        cream: '#F8F2E6',
      },
      fontFamily: {
        heading: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        soft: '0 14px 44px -18px rgba(21, 18, 14, 0.16)',
        glow: '0 0 36px rgba(240, 166, 31, 0.48)',
      },
    },
  },
  plugins: [],
}
