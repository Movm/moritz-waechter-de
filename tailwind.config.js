/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Color System (Phtalo Green)
        primary: {
          50: '#F0F8F4',
          100: '#D8F0E6',
          200: '#B1E0C9', // Jet stream
          300: '#8AC9B0',
          400: '#6BAA91',
          500: '#52907A',
          600: '#316049', // Base "Deep moss green" color
          700: '#285040',
          800: '#1F3F33',
          900: '#1A332A',
          950: '#123624', // Phtalo green
        },
        // Secondary Color System ("Eucalyptus" - medium green)
        secondary: {
          50: '#F0F4F3',
          100: '#D5E1DC',
          200: '#BACEC6',
          300: '#A0BBB0',
          400: '#85A899',
          500: '#6A9583',
          600: '#5F8575', // Base "Eucalyptus" color
          700: '#445F54',
          800: '#31453C',
          900: '#1E2A25',
          950: '#0B0F0D',
        },
        // Tertiary Color System (Warm Cream/Sand)
        tertiary: {
          50: '#FDFCFB',
          100: '#F9F7F4',
          200: '#F5F1E8',
          300: '#EFE8DA',
          400: '#E8DCC8',
          500: '#DCC9AD',
          600: '#C9B494',
          700: '#A89470',
          800: '#8A7658',
          900: '#6B5B44',
          950: '#4A3F2F',
        },
        dark: {
          DEFAULT: '#2a2a2a',
          darker: '#1e1e1e',
        },
      },
      fontFamily: {
        display: ['Raleway', 'ui-sans-serif', 'system-ui'],
        sans: ['Open Sans', 'ui-sans-serif', 'system-ui'],
      },
      backgroundImage: {
        'gradient-phtalo': 'linear-gradient(135deg, #316049 0%, #1F3F33 100%)',
        'gradient-phtalo-dark': 'linear-gradient(135deg, #1A332A 0%, #123624 100%)',
        'gradient-accent': 'linear-gradient(to right, #52907A 0%, #285040 100%)',
        'gradient-accent-dark': 'linear-gradient(to right, #8AC9B0 0%, #52907A 100%)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};
