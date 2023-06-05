import theme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,svelte}",
  ],
  theme: {
    extend: {
      animation: {
        'spin-fast': 'spin 300ms linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',
        'wiggle-fast': 'wiggle 300ms ease-in-out infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-9deg)' },
          '50%': { transform: 'rotate(9deg)' },
        },
      },
    },
    fontFamily: {
      'rubik': ['Rubik', ...theme.fontFamily.sans],
    },
  },
  corePlugins: {
    aspectRatio: false,
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}

