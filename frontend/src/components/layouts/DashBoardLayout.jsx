import React, { useContext } from 'react';
import { UserContext } from '../../context/Context';
import SideMenu from './SideMenu';
import Navbar from './Navbar';

const DashBoardLayout = ({ children, activeMenu }) => {
  const { user } = useContext(UserContext);

  return (
    <div className="h-screen bg-white dark:bg-[#0d0d0d] flex flex-col">
      {/* Fixed Navbar */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Navbar activeMenu={activeMenu} />
      </div>

      {user && (
        <div className="flex flex-1 overflow-hidden pt-[70px]"> {/* Padding to offset navbar height */}
          {/* Sidebar */}
          <div className="max-[1080px]:hidden h-full">
            <SideMenu activeMenu={activeMenu} />
          </div>

          {/* Main Content */}
          <div className="grow overflow-y-auto px-5 py-4 h-full text-black dark:text-gray-200">
            {children}
          </div>
        </div>
      )}
    </div>
  );
};

export default DashBoardLayout;
