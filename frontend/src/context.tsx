import { userData } from "@/lib/types/types.ts";
import React, { useEffect, useState } from "react";

export const Context = React.createContext<
    | {
        user: userData | null;
        setUser: React.Dispatch<React.SetStateAction<userData | null>>;
        isAuthenticated: boolean;
        setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
        logout: () => void;  // Ensure logout is part of the context type
    }
    | null
>(null);
const ContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<userData | null>(null);
    const [isAuthenticated, setAuthentication] = useState<boolean>(false);

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuthentication(false);
                return;
            }

            try {
                const auth_response = await fetch("http://localhost:8080/api/user/auth", {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    },
                });

                if (!auth_response.ok) {
                    setAuthentication(false);
                    return;
                }

                const auth_data = await auth_response.json();
                setUser(auth_data as userData);
                setAuthentication(true);
            } catch (error) {
                console.error("Error during authentication:", error);
                setAuthentication(false);
            }
        };

        checkAuth();
    }, []); // Only run once on mount
    // Function to log out and reset context state
    const logout = () => {
        localStorage.removeItem("token"); // Remove stored token
        setUser(null); // Reset user data
        setAuthentication(false); // Reset authentication state
    };

    return (
        <Context.Provider value={{ user, setUser, isAuthenticated, setAuthentication, logout }}>
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
