import React, { useState } from 'react'
import {HiOutlineMenu, HiOutlineX} from "react-icons/hi" 
 import SideMenu from './SideMenu'
import { useNavigate } from 'react-router-dom'
 
const Navbar = ({activeMenu}) => {
     const [openSideMenu, setOpenSideMenu] = useState(false)
     const navigate = useNavigate()
  return (
    <div className='flex gap-5 justify-between border border-b border-gray-200/50
   backdrop-blur-[2px] py-4 px-7 sticky top-0 z-30 bg-white/80 shadow-md shadow-gray-300/20'>
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
                <div className='fixed top-[61px] -ml-4 bg-white'>
                    <SideMenu activeMenu={activeMenu} />
                </div>
                )   
        }
    </div>
  )
}

export default Navbar