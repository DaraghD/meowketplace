import { MessageNotification, userData } from "@/lib/types/types.ts";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SockJS from 'sockjs-client';
import Stomp from 'stompjs';
import { Link } from "react-router-dom";

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
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);

    const sendMessageNotification = async (notification: MessageNotification) => {
        if (user) {
            if (notification.message === "Message sent!") {
                toast(notification.message, { duration: 5000 });
            } else {
                toast(
                    <>
                        {notification.message}
                        <br />
                        <Link to={`/messages/${notification.id}`} className="font-semibold text-blue-600">
                            View Message
                        </Link>
                    </>,
                    {
                        duration: 5000, // Optional: Adjust duration
                    }
                );

            }
            window.dispatchEvent(new Event('newMessage'));
        };
    }

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

    useEffect(() => {
        if (isAuthenticated && user) {
            const socket = new SockJS('http://localhost:8080/ws');
            const client = Stomp.over(socket);

            client.connect({}, () => {
                client.subscribe(`/topic/messages/${user.id}`, (message: Stomp.Message) => {
                    const notificiation: MessageNotification = JSON.parse(message.body);
                    sendMessageNotification(notificiation);
                });
                setStompClient(client);
            });
            return () => {
                if (stompClient) {
                    stompClient.disconnect(() => { console.log("disconnecting"); });
                }
            }
        }
    }, [isAuthenticated, user]);
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
