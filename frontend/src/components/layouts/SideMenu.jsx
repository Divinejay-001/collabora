import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import { SIDE_MENU_DATA, SIDE_MENU_USER_DATA } from '../../utils/data';

const SideMenu = ({ activeMenu }) => {
  const { user, clearUser, loading } = useContext(UserContext);
  const [sideMenuData, setSideMenuData] = useState([]);
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === '/logout') {
      handleLogout();
      return;
    }
    navigate(route);
  };

  const handleLogout = () => {
    localStorage.clear();
    clearUser();
    navigate('/login');
  };

  useEffect(() => {
    if (user) {
      setSideMenuData(user.role === 'admin' ? SIDE_MENU_DATA : SIDE_MENU_USER_DATA);
    }
  }, [user]);

  if (loading || !user) return null;

  return (
    <div className="w-64 h-[calc(100vh-61px)] overflow-y-auto lg:overflow-y-hidden
      bg-white border border-gray-200/50 
      dark:bg-gradient-to-b dark:from-[#0b0b0b] dark:to-[#1a1a1a] dark:border-gray-800">
      
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className='relative'>
          <img
            src={user.profileImageUrl || ""}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full ring-2 ring-primary/40 dark:ring-primary/30"
          />
        </div>

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-gradient-to-br from-primary to-secondary px-3 py-0.5 rounded mt-1 shadow-md">
            Admin
          </div>
        )}

        <h5 className="text-gray-950 dark:text-white font-medium leading-6 mt-3">
          {user?.name || ""}
        </h5>
        <p className="text-[12px] text-gray-500 dark:text-gray-400">
          {user?.email || ""}
        </p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] px-6 py-3 mb-3 transition-all duration-150 rounded-r-full
            ${
              activeMenu === item.label
                ? "bg-gradient-to-r from-primary/80 to-secondary/50 dark:from-primary dark:to-secondary text-white font-semibold shadow-lg"
                : "text-black hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10"
            }`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl" />
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default SideMenu;
