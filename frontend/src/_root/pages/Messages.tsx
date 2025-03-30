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
import { useNavigate } from "react-router-dom";
import { sendMessage } from "@/lib/utils";
import { toast } from "sonner";
import { ServiceInquiryMessage } from "@/components/ServiceInquiryMessage";

const Messages = () => {
    const [chatUsers, setChatUsers] = useState<Message_User[]>([]);
    const [messages, setMessages] = useState<Message[]>([]);
    const [selectedUser, setSelectedUser] = useState<Message_User | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [currentUser, setCurrentUser] = useState<Message_User | null>(null);
    const [messageContent, setMessageContent] = useState<string>("");
    const [loading, setLoading] = useState(true);
    const [hasPendingInquiry, setHasPendingInquiry] = useState(false);

    const shouldDisableChat =
        messages.some(
            (m) =>
                m.message_content.startsWith("--Service Inquiry--") &&
                !messages.some(
                    (m) =>
                        m.message_content === "--Service Inquiry Accepted--" ||
                        m.message_content === "--Service Inquiry Declined--"
                )
        ) ||
        messages.some((m) => m.message_content === "--Transaction Completed--");

    useEffect(() => {
        if (selectedUser && currentUser) {
            const hasUnrespondedInquiry = messages.some(
                (message) =>
                    (message.sender_id === selectedUser.id ||
                        message.receiver_id === selectedUser.id) &&
                    message.message_content.startsWith("--Service Inquiry--") &&
                    !messages.some(
                        (m) =>
                            (m.sender_id === currentUser.id ||
                                m.receiver_id === currentUser.id) &&
                            (m.message_content ===
                                "--Service Inquiry Accepted--" ||
                                m.message_content ===
                                    "--Service Inquiry Declined--")
                    )
            );

            const hasAcceptedInquiry = messages.some(
                (message) =>
                    (message.sender_id === selectedUser.id ||
                        message.receiver_id === selectedUser.id) &&
                    message.message_content === "--Service Inquiry Accepted--"
            );

            const hasCompletedTransaction = messages.some(
                (message) =>
                    (message.sender_id === selectedUser.id ||
                        message.receiver_id === selectedUser.id) &&
                    message.message_content === "--Transaction Completed--"
            );

            setHasPendingInquiry(
                (hasUnrespondedInquiry && !hasAcceptedInquiry) ||
                    hasCompletedTransaction
            );
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

        if (currentUser) {
            fetchMessages();
            const pollingInterval = setInterval(fetchMessages, 5000);
            return () => clearInterval(pollingInterval);
        }
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
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to verify user");
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

            await sendMessage(
                "--Transaction Completed--",
                currentUser.id,
                selectedUser.id
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
            <div className="w-1/4 bg-white border-r border-gray-200 p-4 overflow-y-auto">
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
            <div className="w-3/4 flex flex-col">
                <div className="p-4 bg-white border-b border-gray-200 flex justify-between items-center">
                    <h2 className="text-lg font-semibold">
                        {selectedUser
                            ? selectedUser.username
                            : "Select a user to start chatting"}
                    </h2>

                    {currentUser?.is_business &&
                        selectedUser &&
                        !selectedUser.is_verified && (
                            <Button
                                onClick={verifyUser}
                                className="bg-green-600 hover:bg-green-700 text-white"
                            >
                                Complete Transaction
                            </Button>
                        )}

                    {selectedUser?.is_verified && (
                        <span className="text-green-600 flex items-center">
                            <CheckCircle className="w-5 h-5 mr-1" />
                            Verified
                        </span>
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
                                                    ? "sent"
                                                    : "received"
                                            }
                                        >
                                            <ChatBubbleAvatar
                                                src={
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? "1"
                                                        : "2"
                                                }
                                                fallback={
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? selectedUser.username
                                                              .substring(0, 2)
                                                              .toUpperCase()
                                                        : message.receiver_username
                                                              .substring(0, 2)
                                                              .toUpperCase()
                                                }
                                            />
                                            <ChatBubbleMessage
                                                variant={
                                                    message.sender_id ===
                                                    selectedUser.id
                                                        ? "sent"
                                                        : "received"
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
                        {messages.some(
                            (m) =>
                                m.message_content ===
                                "--Transaction Completed--"
                        )
                            ? "Chat disabled - please initiate a new service inquiry"
                            : "Please respond to the service inquiry to continue chatting"}
                    </div>
                )}

                {!shouldDisableChat && selectedUser && (
                    <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
                        <ChatInput
                            placeholder="Type your message here..."
                            className="flex-1"
                            value={messageContent}
                            onChange={(e) => setMessageContent(e.target.value)}
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
