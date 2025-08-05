import React, { useState, useEffect } from 'react';
import { Lightbulb, LightbulbOff } from 'lucide-react';
import lightPng from '../assets/website/light-mode-button.png';
import darkPng from '../assets/website/dark-mode-button.png';

const DarkMode = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem('theme') || 'light'
  );

  const element = document.documentElement;

  useEffect(() => {
    if (theme === 'dark') {
      element.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      element.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

 return (
  <div className='relative'>
    {/* MOBILE BUTTONS (IMAGES) */}
    <div className='md:hidden'>
      {theme === 'light' ? (
        <img
          src={lightPng}
          alt="Switch to Dark"
          onClick={toggleTheme}
          className='w-10 cursor-pointer drop-shadow transition-all duration-300'
        />
      ) : (
        <img
          src={darkPng}
          alt="Switch to Light"
          onClick={toggleTheme}
          className='w-10 cursor-pointer drop-shadow transition-all duration-300'
        />
      )}
    </div>

    {/* DESKTOP BULB ICONS */}
   <div className="relative hidden lg:block w-fit h-fit" onClick={toggleTheme}>
  {/* Glow circle behind the bulb */}
  {theme !== 'dark' && (
    <div className="absolute inset-0 z-0 w-10 h-10 rounded-full bg-primary blur-lg  animate-pulse"></div>
  )}

  {/* Bulb icon (no fill) */}
 {theme === 'dark' ? (
  <Lightbulb
    size={40}
    className="relative z-10 text-gray-400 hover:text-white hover:drop-shadow-[2px_2px_10px_white] transition duration-300"
    strokeWidth={2}
  />
) : (
  <Lightbulb
    size={40}
    className="relative z-10 text-primary hover:drop-shadow-[0_0_10px] transition duration-300"
    strokeWidth={2}
  />
)}

</div>

  </div>
);

};

export default DarkMode;
