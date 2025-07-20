import React, { createContext, useState, useEffect } from 'react';
import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPaths';

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Delay to ensure token is available in localStorage after page reload
  useEffect(() => {
    const syncToken = () => {
      const storedToken = localStorage.getItem("token");
      console.log("🧠 [Init] Checking token in localStorage:", storedToken);
      if (storedToken) {
        setToken(storedToken); // ✅ triggers fetchUser
      } else {
        console.log("⚠️ No token found on mount. Skipping fetchUser.");
        setLoading(false);
      }
    };

    // Run after short delay to beat race condition
    const delay = setTimeout(syncToken, 300); // Try 300ms

    return () => clearTimeout(delay);
  }, []);

  // ✅ Fetch user *whenever token changes*
  useEffect(() => {
    if (!token) return;

    const fetchUser = async () => {
      console.log("📡 Fetching user with token:", token);

      try {
        const res = await axiosInstance.get(API_PATHS.AUTH.GET_PROFILE, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(res.data);
        console.log("✅ User fetched:", res.data);
      } catch (err) {
        console.error("❌ Error fetching user:", err);
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  // ✅ Called from Login.jsx after successful login
  const updateUser = (userData) => {
    const userToken = userData.token;
    localStorage.setItem("token", userToken);
    setToken(userToken); // ✅ this will trigger fetchUser
  };

  const clearUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider value={{ user, loading, updateUser, clearUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
