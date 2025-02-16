import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import useUserStore from "../store/store";

const Protected = ({ children }) => {
    const [authenticate, setAuthenticate] = useState(null); // null for loading state
    const userData = useUserStore((state) => state.userData);
    // const {user} = useUserStore()

    const getUser = async () => {
        try {
            const res = await axios.get("http://localhost:5000/auth/isLoggedIn", {
                withCredentials: true,
            });
            console.log("Response from /auth/isLoggedIn:", res.data);
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
        return <div>Loading...</div>; // Loading state
    }

    if (!authenticate) {
        return <Navigate to="/" replace={true} />;
    }

    return children;
};

export default Protected;
