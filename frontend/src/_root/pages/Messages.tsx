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
import { Message, User } from "@/lib/types/types";

const Messages = () => {
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);
  const [chatUsers, setChatUsers] = useState<User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

// Fetch Logged in User
  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/logged-in-user");
        if (!response.ok) {
          throw new Error("Failed to fetch logged-in user");
        }
        const data: User = await response.json();
        setLoggedInUser(data);
      } catch (error) {
        console.error("Error fetching logged-in user:", error);
      }
    };

    fetchLoggedInUser();
  }, []);

  // Fetch chat users from the database
  useEffect(() => {
    const fetchChatUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/chat-users");
        if (!response.ok) {
          throw new Error("Failed to fetch chat users");
        }
        const data = await response.json();
        setChatUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchChatUsers();
  }, []);

  // Fetch all messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/messages");
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  // Filter messages for the selected user
  const filteredMessages = selectedUser
    ? messages.filter(
        (message) =>
          (message.sender.id === loggedInUser?.id &&
            message.receiver.id === selectedUser.id) ||
          (message.sender.id === selectedUser.id &&
            message.receiver.id === loggedInUser?.id)
      )
    : [];

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      {/* Sidebar (1/4 width) */}
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
                onClick={() => setSelectedUser(user)} // Set selected user on click
              >
                <Avatar>
                  <AvatarImage src={user.avatarUrl} />
                  <AvatarFallback>
                    {user.username
                      .split(" ")
                      .map((part) => part[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="pl-3">
                  <p className="font-medium">{user.username}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Chat Area (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-semibold">
            {selectedUser
              ? selectedUser.username
              : "Select a user to start chatting"}
          </h2>
        </div>

       {/* Chat Messages */}
       <div className="flex-1 p-4 overflow-y-auto">
          <ChatMessageList>
            {selectedUser ? (
              filteredMessages.length > 0 ? (
                filteredMessages.map((message) => (
                  <ChatBubble
                    key={message.id}
                    variant={
                      message.sender.id === loggedInUser?.id
                        ? "sent"
                        : "received"
                    }
                  >
                    <ChatBubbleAvatar
                      src={
                        message.sender.id === loggedInUser?.id
                          ? loggedInUser.avatarUrl // Logged-in user is the sender
                          : selectedUser.avatarUrl // Selected user is the sender
                      }
                      fallback={
                        message.sender.id === loggedInUser?.id
                          ? loggedInUser.username.substring(0, 2).toUpperCase()
                          : selectedUser.username
                              .substring(0, 2)
                              .toUpperCase()
                      }
                    />
                    <ChatBubbleMessage
                      variant={
                        message.sender.id === loggedInUser?.id
                          ? "sent"
                          : "received"
                      }
                    >
                      {message.messageContent}
                    </ChatBubbleMessage>
                  </ChatBubble>
                ))
              ) : (
                <p>No messages found.</p>
              )
            ) : (
              <p>Please select a user to view messages.</p>
            )}
          </ChatMessageList>
        </div>

        {/* Chat Input with Submit Button */}
        <div className="p-4 bg-white border-t border-gray-200 flex items-center gap-2">
          <ChatInput
            placeholder="Type your message here..."
            className="flex-1"
          />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white">
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
