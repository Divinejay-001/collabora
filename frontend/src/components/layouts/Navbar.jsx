import React, { useState } from 'react'
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi'
import SideMenu from './SideMenu'
import { Link, useNavigate } from 'react-router-dom'
import DarkMode from '../DarkMode'

const Navbar = ({ activeMenu }) => {
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const navigate = useNavigate()

  return (
   <div className="flex justify-between items-center border-b border-gray-200/50 backdrop-blur-[2px] py-3 px-7 bg-white/80 dark:bg-black shadow-md shadow-gray-300/20">

      {/* Logo with Glow */}
      <div className='relative flex items-center space-x-1'>
        {/* Glow Div */}
        <div className="absolute w-10 h-10 rounded-full blur-xl z-[-1] bg-yellow-300/60 dark:bg-purple-700/40" />

        {/* Actual Logo Circle */}
        <div className="w-10 h-10 glow-spin-y rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center">
          <p className="text-white font-outfit font-bold text-xl md:text-2xl">C</p>
        </div>

        {/* Brand Name */}
        <h2 className="text-shadow font-outfit font-bold text-xl sm:text-2xl text-slate-800 dark:text-slate-200 tracking-tight">
        <Link to="/admin/dashboard"> Colla<span className="text-black/60 dark:text-slate-300">bora</span></Link> 
        </h2>
      </div>

      {/* Right Side Buttons */}
      <div className='flex items-center gap-6'>
        <DarkMode />
        <button
          className='block lg:hidden text-black'
          onClick={() => setOpenSideMenu(!openSideMenu)}
        >
          {openSideMenu ? (
            <HiOutlineX className='text-2xl text-red-500' />
          ) : (
            <HiOutlineMenu className='text-2xl text-primary' />
          )}
        </button>
      </div>

      {/* Side Menu */}
      {openSideMenu && (
        <div className='fixed top-[61px] left-0 z-20'>
          <SideMenu activeMenu={activeMenu} />
        </div>
      )}
    </div>
  )
}

export default Navbar
