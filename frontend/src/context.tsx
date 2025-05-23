import { MessageNotification, userData } from "@/lib/types/types.ts";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import { Link } from "react-router-dom";

interface ContextType {
    user: userData | null;
    setUser: React.Dispatch<React.SetStateAction<userData | null>>;
    isAuthenticated: boolean;
    setAuthentication: React.Dispatch<React.SetStateAction<boolean>>;
    logout: () => void;
    uploadTrigger: number;
    triggerUpload: () => void; // New function to trigger profile picture updates
}

export const Context = React.createContext<ContextType | null>(null);

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<userData | null>(null);
    const [isAuthenticated, setAuthentication] = useState<boolean>(false);
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [uploadTrigger, setUploadTrigger] = useState<number>(0); // New state for profile picture updates

    // Function to trigger profile picture updates
    const triggerUpload = () => {
        setUploadTrigger((prev) => prev + 1);
    };

    const sendMessageNotification = async (
        notification: MessageNotification
    ) => {
        if (user) {
            if (notification.message === "Message sent!") {
                toast(notification.message, { duration: 5000 });
            } else {
                toast(
                    <>
                        {notification.message}
                        <br />
                        <Link
                            to={`/messages/${notification.id}`}
                            className="font-semibold text-blue-600"
                        >
                            View Message
                        </Link>
                    </>,
                    {
                        duration: 5000,
                    }
                );
            }
            window.dispatchEvent(new Event("newMessage"));
        }
    };

    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) {
                setAuthentication(false);
                return;
            }

            try {
                const auth_response = await fetch(
                    "http://localhost:8080/api/user/auth",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );

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
    }, []);

    useEffect(() => {
        if (isAuthenticated && user) {
            const socket = new SockJS("http://localhost:8080/ws");
            const client = Stomp.over(socket);

            client.connect({}, () => {
                client.subscribe(
                    `/topic/messages/${user.id}`,
                    (message: Stomp.Message) => {
                        const notificiation: MessageNotification = JSON.parse(
                            message.body
                        );
                        sendMessageNotification(notificiation);
                    }
                );
                setStompClient(client);
            });
            return () => {
                if (stompClient) {
                    stompClient.disconnect(() => {
                        console.log("disconnecting");
                    });
                }
            };
        }
    }, [isAuthenticated, user]);

    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
        setAuthentication(false);
        setUploadTrigger(0);
    };

    return (
        <Context.Provider
            value={{
                user,
                setUser,
                isAuthenticated,
                setAuthentication,
                logout,
                uploadTrigger,
                triggerUpload,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default ContextProvider;
