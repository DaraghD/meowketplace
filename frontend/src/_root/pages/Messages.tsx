import { useEffect, useState } from "react";
import {
    ChatBubble,
    ChatBubbleAvatar,
    ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Message, Message_User } from "@/lib/types/types";
import { useNavigate, useParams } from "react-router-dom";
import { sendMessage } from "@/lib/utils";
import { toast } from "sonner";
import { ServiceInquiryMessage } from "@/components/ServiceInquiryMessage";
import ReportButton from "@/components/Report";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

const Messages = () => {
    const { id } = useParams();
    const params_user_id = id ? parseInt(id, 10) : NaN;

    const [chatUsers, setChatUsers] = useState<Message_User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<Message_User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<Message_User | null>(null);
    const [messageContent, setMessageContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [hasPendingInquiry, setHasPendingInquiry] = useState(false);
    const [isVerify, setIsVerify] = useState(false);

    useEffect(() => {
        if (params_user_id && chatUsers) {
            const params_user: Message_User | undefined = chatUsers.find(
                (user) => {
                    return user.id === params_user_id;
                }
            );
            if (params_user) {
                setSelectedUser(params_user);
            }
        }

        if (selectedUser && currentUser) {
            const hasUnrespondedInquiry = messages.some(
                (message) =>
                    ((message.sender_id === selectedUser.id &&
                        message.receiver_id === currentUser.id) ||
                        (message.receiver_id === selectedUser.id &&
                            message.sender_id === currentUser.id)) &&
                    message.message_content.startsWith("--Service Inquiry--") &&
                    !messages.some(
                        (m) =>
                            ((m.sender_id === currentUser.id &&
                                m.receiver_id === selectedUser.id) ||
                                (m.receiver_id === currentUser.id &&
                                    m.sender_id === selectedUser.id)) &&
                            (m.message_content ===
                                "--Service Inquiry Accepted--" ||
                                m.message_content ===
                                    "--Service Inquiry Declined--")
                    )
            );

            setHasPendingInquiry(hasUnrespondedInquiry);
        }
    }, [selectedUser, messages, currentUser]);

    const navigate = useNavigate();

    useEffect(() => {
        const fetchCurrentUser = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/user/auth",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    navigate("/sign-in");
                }
                const data = await response.json();
                const user: Message_User = {
                    id: data.id,
                    username: data.username,
                    is_verified: data.is_verified,
                    is_business: data.is_business,
                };
                setCurrentUser(user);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "An error occurred"
                );
            }
        };
        fetchCurrentUser();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/messages",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error("Failed to fetch messages");
                }
                const data: Message[] = await response.json();

                const userMap = new Map<number, Message_User>();
                data.forEach((message) => {
                    if (!userMap.has(message.sender_id)) {
                        userMap.set(message.sender_id, {
                            id: message.sender_id,
                            username: message.sender_username,
                            is_verified: message.sender_verified,
                        });
                    }
                    if (!userMap.has(message.receiver_id)) {
                        userMap.set(message.receiver_id, {
                            id: message.receiver_id,
                            username: message.receiver_username,
                            is_verified: message.receiver_verified,
                        });
                    }
                });

                const usersArray = Array.from(userMap.values());
                const filteredUsers = usersArray.filter(
                    (user) => currentUser && user.id !== currentUser.id
                );

                setChatUsers(filteredUsers);
                setMessages(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching messages:", error);
            }
        };

        const handleNewMessage = () => {
            fetchMessages();
        };
        window.addEventListener("newMessage", handleNewMessage);
        fetchMessages();
        return () => {
            window.removeEventListener("newMessage", handleNewMessage);
        };
    }, [currentUser]);

    const filteredMessages = selectedUser
        ? messages.filter(
              (message) =>
                  message.sender_id === selectedUser.id ||
                  message.receiver_id === selectedUser.id
          )
        : [];

    if (messages.length === 0 && !loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <h1 className="text-center text-2xl">
                    No conversations, start one with a service inquiry{" "}
                    <a href="/product" className="text-blue-500 underline">
                        here
                    </a>
                    .
                </h1>
            </div>
        );
    }

    const handleServiceInquiryResponse = async (response: string) => {
        if (!selectedUser || !currentUser) {
            toast.error("No user selected or not logged in");
            return;
        }

        try {
            await sendMessage(response, currentUser.id, selectedUser.id);
            toast.success("Response sent successfully");
        } catch (error) {
            console.error("Error sending response:", error);
            toast.error("Failed to send response");
        }
    };

    const verifyUser = async () => {
        if (!selectedUser || !currentUser) return;

        setIsVerify(true);

        try {
            const response = await fetch(
                `http://localhost:8080/api/user/verify`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        user_id_to_verify: selectedUser.id,
                    }),
                }
            );

            if (!response.ok) {
                await sendMessage(
                    "--Transaction Completed, User verified, Leave a nice review!😺--",
                    currentUser.id,
                    selectedUser.id
                );
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to verify user");
            } else {
                await sendMessage(
                    "--Transaction Completed, User verified, Leave a nice review!😺--",
                    currentUser.id,
                    selectedUser.id
                );
            }

            setSelectedUser((prev) =>
                prev ? { ...prev, is_verified: true } : null
            );
            setChatUsers((prev) =>
                prev.map((user) =>
                    user.id === selectedUser.id
                        ? { ...user, is_verified: true }
                        : user
                )
            );

            toast.success("User verified successfully!");
        } catch (error) {
            console.error("Error verifying user:", error);
            toast.error(
                error instanceof Error ? error.message : "Failed to verify user"
            );
        }
    };

    return (
        <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
            {/* Sidebar */}
            <div className="hidden md:block w-1/4 bg-white border-r border-gray-200 p-4 overflow-y-auto">
                <h2 className="text-lg font-semibold mb-4">Chats</h2>
                {loading ? (
                    <p>Loading...</p>
                ) : error ? (
                    <p className="text-red-500">{error}</p>
                ) : (
                    <div className="space-y-2">
                        {chatUsers.map((user) => (
                            <div
                                key={user.id}
                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center"
                                onClick={() => setSelectedUser(user)}
                            >
                                <Avatar>
                                    <AvatarImage
                                        src={`http://localhost:8080/api/user/picture/${user?.id}`}
                                    />
                                    <AvatarFallback>
                                        {user.username
                                            .split(" ")
                                            .map((part) => part[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="pl-3">
                                    <p className="font-medium">
                                        {user.username}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Chat Area */}
            <div className="md:w-3/4 w-full flex flex-col">
                <div className="p-2 bg-white border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {selectedUser
                            ? selectedUser.username
                            : "Select a user to start chatting"}
                    </h2>
                    <Drawer>
                        <DrawerTrigger className="block md:hidden">
                            <Button>Select</Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <div className="w-full bg-white border-r border-gray-200 p-4 overflow-y-auto">
                                <h2 className="text-lg font-semibold mb-4">
                                    Chats
                                </h2>
                                {loading ? (
                                    <p>Loading...</p>
                                ) : error ? (
                                    <p className="text-red-500">{error}</p>
                                ) : (
                                    <div className="space-y-2">
                                        {chatUsers.map((user) => (
                                            <div
                                                key={user.id}
                                                className="p-2 hover:bg-gray-100 rounded cursor-pointer flex items-center"
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
                                            >
                                                <Avatar>
                                                    <AvatarImage
                                                        src={`http://localhost:8080/api/user/picture/${user?.id}`}
                                                    />
                                                    <AvatarFallback>
                                                        {user.username
                                                            .split(" ")
                                                            .map(
                                                                (part) =>
                                                                    part[0]
                                                            )
                                                            .join("")}
                                                    </AvatarFallback>
                                                </Avatar>
                                                <div className="pl-3">
                                                    <p className="font-medium">
                                                        {user.username}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </DrawerContent>
                    </Drawer>
                    {currentUser?.is_business && selectedUser && (
                        <Button
                            onClick={verifyUser}
                            disabled={isVerify}
                            className="bg-green-600 hover:bg-green-700 text-white"
                        >
                            Complete Transaction
                        </Button>
                    )}

                    {selectedUser ? (
                        <ReportButton type="user" id={selectedUser.id} />
                    ) : (
                        ""
                    )}
                </div>

                <div className="flex-1 p-4 overflow-y-auto">
                    <ChatMessageList>
                        {selectedUser ? (
                            filteredMessages.length > 0 ? (
                                filteredMessages.map((message) => {
                                    if (
                                        message.message_content.startsWith(
                                            "--Service Inquiry--"
                                        )
                                    ) {
                                        return (
                                            <ServiceInquiryMessage
                                                key={message.id}
                                                message={message}
                                                currentUserId={
                                                    currentUser?.id || 0
                                                }
                                                onResponse={
                                                    handleServiceInquiryResponse
                                                }
                                            />
                                        );
                                    }

                                    return (
                                        <ChatBubble
                                            key={message.id}
                                            variant={
                                                message.sender_id ===
                                                selectedUser.id
                                                    ? "received"
                                                    : "sent"
                                            }
                                        >
                                            <ChatBubbleAvatar
                                                src={`http://localhost:8080/api/user/picture/${
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? selectedUser.id
                                                        : currentUser?.id
                                                }`}
                                                fallback={
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? selectedUser.username
                                                              .substring(0, 2)
                                                              .toUpperCase()
                                                        : (
                                                              currentUser?.username ||
                                                              ""
                                                          )
                                                              .substring(0, 2)
                                                              .toUpperCase()
                                                }
                                            />
                                            <ChatBubbleMessage
                                                variant={
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? "received"
                                                        : "sent"
                                                }
                                            >
                                                {message.message_content}
                                            </ChatBubbleMessage>
                                        </ChatBubble>
                                    );
                                })
                            ) : (
                                <p>No messages found.</p>
                            )
                        ) : (
                            <p>Please select a user to view messages.</p>
                        )}
                    </ChatMessageList>
                </div>

                {hasPendingInquiry && (
                    <div className="p-2 text-center text-sm text-gray-500 bg-gray-100">
                        Please respond to the service inquiry to continue
                        chatting
                    </div>
                )}

                {!hasPendingInquiry && selectedUser && (
                    <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
                        <ChatInput
                            placeholder="Type your message here..."
                            className="flex-1"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
                            onKeyDown={async (e) => {
                                // Add onKeyDown handler
                                if (e.key === "Enter" && !e.shiftKey) {
                                    // Check for Enter key and not Shift+Enter
                                    e.preventDefault(); // Prevent default newline behavior
                                    try {
                                        await sendMessage(
                                            messageContent,
                                            currentUser?.id,
                                            selectedUser?.id
                                        );
                                        setMessageContent("");
                                    } catch (error) {
                                        console.error(error);
                                    }
                                }
                            }}
                        />
                        <Button
                            className="bg-blue-500 hover:bg-blue-600 text-white"
                            onClick={async () => {
                                try {
                                    await sendMessage(
                                        messageContent,
                                        currentUser?.id,
                                        selectedUser?.id
                                    );
                                    setMessageContent("");
                                } catch (error) {
                                    console.error(error);
                                }
                            }}
                        >
                            Send
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Messages;
