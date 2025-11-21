/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cashGreen: '#00D068',      // O verde do botão
        cashDark: '#121212',       // O fundo preto
        cashGray: '#1E1E1E',       // O fundo dos cards/inputs
        cashLightGray: '#2C2C2C',  // Bordas ou elementos secundários
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Fonte sugerida
      }
    },
  },
  plugins: [],
}

