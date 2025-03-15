/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        'primary': {
          50: '#fcf8f0',
          100: '#f9f1e1',
          200: '#f3e3c3',
          300: '#ead19c',
          400: '#dcb76a',
          500: '#c7a462', // Color dorado principal
          600: '#b6934f',
          700: '#97783f',
          800: '#7d6538',
          900: '#665330',
          950: '#3b2f19',
        },
        'accent': '#c7a462',
        'accent-light': '#dcb76a',
        'dark': {
          100: '#d1d1d1',
          200: '#a3a3a3',
          300: '#747474',
          400: '#464646',
          500: '#181818',  // Color oscuro principal
          600: '#161616',
          700: '#121212',
          800: '#0e0e0e',
          900: '#0a0a0a',
        },
        'cream': '#f9f7f4',
      },
      spacing: {
        // Aseguramos que haya definiciones explícitas para espaciado
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
      gap: {
        // Definiciones explícitas para gap
        '2': '0.5rem',
        '4': '1rem',
        '6': '1.5rem',
        '8': '2rem',
        '10': '2.5rem',
        '12': '3rem',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            a: {
              color: '#4f46e5',
              '&:hover': {
                color: '#6366f1',
              },
            },
          },
        },
      },
      fontFamily: {
        'serif': ['Cormorant Garamond', 'Georgia', 'serif'],
        'sans': ['Montserrat', 'sans-serif'],
        'heading': ['Cormorant Garamond', 'serif'],
        'body': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [
     require('@tailwindcss/typography'),
  ],
  // Aseguramos que las utilidades de espaciado sean generadas
  corePlugins: {
    gap: true,
    space: true,
  },
}
