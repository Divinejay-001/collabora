import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi" 
 import SideMenu from './SideMenu'
import { useNavigate } from 'react-router-dom'
 
const Navbar = ({activeMenu}) => {
     const [openSideMenu, setOpenSideMenu] = useState(false)
     const navigate = useNavigate()
  return (
    <div className='flex gap-5 justify-between border border-b border-gray-200/50
   backdrop-blur-[2px] py-3 px-7 sticky top-0 z-30 bg-white/80 shadow-md shadow-gray-300/20'>

    <div className="flex items-center space-x-1">
  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-500 to-violet-600 flex items-center justify-center glow-spin-y">
    <p className="text-white font-outfit font-bold text-xl sm:text-2xl">C</p>
  </div>
  <h2 className="text-shadow font-outfit font-bold text-xl sm:text-2xl text-slate-800 tracking-tight">
    Colla<span className="text-black/60">bora</span>
  </h2>
</div>

    
     <div className='flex items-center gap-6'>
      <button className=' block lg:hidden text-black'
     onClick={() => {
    setOpenSideMenu(!openSideMenu)
     }}>
        {openSideMenu ? (
        <HiOutlineX className='text-2xl text-red-500' />
        ) : (
        <HiOutlineMenu className='text-2xl text-primary' />
        )}
        </button>


     </div>
     

       {
  openSideMenu && (
    <div className='fixed top-[61px] left-0 z-20'>
      <SideMenu activeMenu={activeMenu} />
    </div>
  )
}

    </div>
  )
}

export default Navbar