/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customSelection: '#123534', 
        customBrown: '#946F56',
        customGold: '#A89B69',
      },
    },
  },
  plugins: [],
}

