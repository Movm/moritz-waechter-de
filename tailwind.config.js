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
        // Primary Color System ("Tanne" - dark green)
        primary: {
          50: '#e8f2ee',
          100: '#c8dfd5',
          200: '#a3c9b8',
          300: '#7db39a',
          400: '#60a183',
          500: '#428f6c',
          600: '#005538', // Base "Tanne" color
          700: '#004a2f',
          800: '#003e26',
          900: '#00321d',
          950: '#002315',
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
        'gradient-tanne': 'linear-gradient(135deg, #005538 0%, #004a2f 100%)',
        'gradient-tanne-dark': 'linear-gradient(135deg, #003e26 0%, #00321d 100%)',
        'gradient-accent': 'linear-gradient(to right, #428f6c 0%, #005538 100%)',
        'gradient-accent-dark': 'linear-gradient(to right, #60a183 0%, #005538 100%)',
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
