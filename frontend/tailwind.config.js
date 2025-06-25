/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       keyframes: {
    wave: {
      '0%': { transform: 'rotate(0deg)' },
      '10%': { transform: 'rotate(14deg)' },
      '20%': { transform: 'rotate(-8deg)' },
      '30%': { transform: 'rotate(14deg)' },
      '40%': { transform: 'rotate(-4deg)' },
      '50%': { transform: 'rotate(10deg)' },
      '60%': { transform: 'rotate(0deg)' },
      '100%': { transform: 'rotate(0deg)' },
    }
  },
  animation: {
    wave: 'wave 1.6s ease-in-out infinite',
  },
      colors: {
        primary: ' #7C3AED',
        secondary: '#00c3c7',
        tertiary: '#D22DC9',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif', "Quicksand"],
        cinzel: ['Cinzel', 'serif'],
        outfit: ['Outfit', 'sans-serif'],},
     container: {
       center: true,
       padding:{
        DEFAULT:'1rem',
        sm: '2rem',
        lg:'4rem',
        xl:'5rem',
        '2xl':'6rem',
       }
    }
  },
},
  plugins: [],
}