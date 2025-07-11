import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashBoardLayout = ({children, activeMenu}) => {

    const user = useContext(UserContext)
  return (
    <div>
        <Navbar activeMenu={activeMenu} />

        {
            user && (
            <div className='flex'>
                <div className='max-[1080px]:hidden'>
                    <SideMenu activeMenu={activeMenu} />
                </div>

                <div className='grow mx-5'>
                    {children}
                </div>
            </div>
            )
        }
    </div>
  )
}

export default DashBoardLayout