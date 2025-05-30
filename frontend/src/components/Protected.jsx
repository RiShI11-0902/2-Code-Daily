import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/store";
import { Loader } from "lucide-react";

const Protected = ({ children }) => {
    const [authenticate, setAuthenticate] = useState(null); // null for loading state
    const userData = useUserStore((state) => state.userData);
    // const {user} = useUserStore()
////("https://2-code-daily.netlify.app/dashboard");
    const getUser = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BACKEND_BASE_URL}/auth/isLoggedIn`, {
                withCredentials: true,
            });
            if (res.status === 200 && res.data?.data) {
                
                userData(res.data.data); // Set user data in the store
                setAuthenticate(true); // User is authenticated
            } else {
                setAuthenticate(false); // User is not authenticated
            }
        } catch (error) {
            setAuthenticate(false); // Handle errors gracefully
            useUserStore.getState().removeUser()
            console.error("Error during authentication check:", error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    if (authenticate === null) {
        return <div className="w-full"><Loader className="mx-auto flex items-center justify-center text-white w-5 animate-spin h-screen" /></div>; // Loading state
    }

    if (!authenticate) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};

export default Protected;
