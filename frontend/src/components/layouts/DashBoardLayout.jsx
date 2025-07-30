import React, { useContext } from 'react'
import { UserContext } from '../../context/Context'
import SideMenu from './SideMenu'
import Navbar from './Navbar'

const DashBoardLayout = ({ children, activeMenu }) => {
  const user = useContext(UserContext)

  return (
    <div className="h-screen flex flex-col"> {/* Full screen height */}
      <Navbar activeMenu={activeMenu} />

      {user && (
        <div className="flex flex-1 overflow-hidden">
          {/* Sidebar */}
          <div className="max-[1080px]:hidden h-full">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="grow overflow-y-auto px-5 py-4 h-full">
            {children}
          </div>
        </div>
      )}
    </div>
  )
}

export default DashBoardLayout
