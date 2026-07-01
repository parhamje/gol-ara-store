/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        persian: ['Vazirmatn', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: {
          50:  '#fdf2f8',
          100: '#fce7f3',
          200: '#fbcfe8',
          300: '#f9a8d4',
          400: '#f472b6',
          500: '#d4578a',
          600: '#b83d72',
          700: '#9d2b5c',
          800: '#7e1d49',
          900: '#5f1538',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease forwards',
      },
      keyframes: {
        fadeInUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to:   { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
