import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";

export const useUserAuth = () => {
  const { user, loading, clearUser } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return; // Don't act until user is loaded

    if (!user) {
      console.log("User not found. Redirecting...");
      clearUser();
      navigate("/login");
    }
  }, [user, loading, clearUser, navigate]);
};
