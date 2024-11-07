/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      padding: {
        '62': '15.5rem',
        '66': '16.5rem',
      },
      screens: {
        'custom-1075': '1075px',
      },
      maxWidth: {
        '25rem': '25rem', 
        '28rem': '28rem',
      },
      colors: {
        'regal-blue': '#243c5a',
      },
    }
  },
  plugins: [],
}

