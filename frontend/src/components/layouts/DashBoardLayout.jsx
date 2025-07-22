import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashBoardLayout = ({children, activeMenu}) => {

    const user = useContext(UserContext)
  return (
     <div className="min-h-screen flex flex-col">
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="max-[1080px]:hidden">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="grow mx-5 overflow-y-auto py-4">
            {children}
          </div>
        </div>
            )
        }
    </div>
  )
}

export default DashBoardLayout