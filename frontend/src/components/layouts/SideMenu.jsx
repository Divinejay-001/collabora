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

  // ⛔️ Don't render if still loading user
  if (loading || !user) return null;

  return (
<div className="w-64 h-[calc(100vh-61px)] bg-white border border-gray-200/50 overflow-y-auto lg:overflow-y-hidden">
      <div className="flex flex-col items-center justify-center mb-7 pt-5">
        <div className='relative'>
        <img
          src={user.profileImageUrl || ""}
          alt="Profile Image"
          className="w-20 h-20 bg-slate-400 rounded-full"
        />
        </div>

        {user?.role === "admin" && (
          <div className="text-[10px] font-medium text-white bg-gradient-to-b from-primary to-primary/40 px-3 py-0.5 rounded mt-1">
            Admin
            </div>
        )}

        <h5 className="text-gray-950 font-medium leading-6 mt-3">
          {user?.name || ""}</h5>
        <p className="text-[12px] text-gray-500">
          {user?.email || ""}</p>
      </div>

      {sideMenuData.map((item, index) => (
        <button
          key={`menu_${index}`}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === item.label
              ? "text-primary bg-gradient-to-r from-primary/40 to-secondary/20 border-r-4 border-primary/50"
              : ""
          } py-3 px-6 mb-3 cursor-pointer`}
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
