import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/Context";
export const useUserAuth = () => {
    const { user, loading, clearUser } = useContext(UserContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        // Check if user is authenticated
        if (loading) return;
        if (user) return;
       
        if (!user) {
        // Redirect to login page if not authenticated
        clearUser();
        navigate("/login");
        }
    }, [user, loading, clearUser, navigate]);
}