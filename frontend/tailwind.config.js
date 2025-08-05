/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
    darkMode: 'class',
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

   textShadow: {
        sm: '1px 1px 2px rgba(0,0,0,0.25)',
        DEFAULT: '2px 2px 4px rgba(0,0,0,0.3)',
        lg: '3px 3px 6px rgba(0,0,0,0.35)',
        white: '0px 1px 2px rgba(255, 255, 255, 0.5)',
        glow: '0 0 8px rgba(99,102,241,0.7)', // indigo glow
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
  plugins: [
    function ({ addUtilities, theme }) {
      const newUtilities = {};
      const shadows = theme('textShadow');

      for (const [name, value] of Object.entries(shadows)) {
        newUtilities[`.text-shadow${name === 'DEFAULT' ? '' : `-${name}`}`] = {
          textShadow: value,
        };
      }

      addUtilities(newUtilities);
    }
  ],
}