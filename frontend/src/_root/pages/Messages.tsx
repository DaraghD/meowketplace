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
import {useNavigate} from "react-router-dom";
import {sendMessage } from "@/lib/utils";

const Messages = () => {
  const [chatUsers, setChatUsers] = useState<Message_User[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedUser, setSelectedUser] = useState<Message_User | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<Message_User | null>(null); //TODO: replace this with global state later
  const [messageContent, setMessageContent] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        console.log("TOken : ", localStorage.getItem("token"));
        const response = await fetch("http://meowketplace.ie:8080/api/user/auth",{
          method: "GET",
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
          },

        });
        if (!response.ok) {
          navigate("/sign-in"); //token out of date relogin,
        }
        const data = await response.json();
        const user : Message_User = {
            id: data.id,
            username: data.username,
            is_verified: data.is_verified,
        }
        setCurrentUser(user);
        alert(user.username);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      }
    };
    fetchCurrentUser();
  }, []);

  // Fetch all messages from the backend
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await fetch("http://meowketplace.ie:8080/api/messages",
            {
              method: "GET",
              headers: {"Authorization": `Bearer ${localStorage.getItem("token")}`,}
            },
        )
        if (!response.ok) {
          throw new Error("Failed to fetch messages");
        }
        const data: Message[] = await response.json();
        console.log(data);

        const userMap = new Map<number, Message_User>();
        data.forEach(message => {
            if (!userMap.has(message.sender_id)) {
                console.log("Adding sender user to map: ", message.sender_id);
                userMap.set(message.sender_id, {
                    id: message.sender_id,
                    username: message.sender_username,
                    is_verified: message.sender_verified,
                });
            }
            if (!userMap.has(message.receiver_id)) {
                console.log(message);
                console.log("Adding receiver user to map: ", message.receiver_id);
                console.log("Receiver username: ", message.receiver_username);
                userMap.set(message.receiver_id, {
                    id: message.receiver_id,
                    username: message.receiver_username,
                    is_verified: message.receiver_verified,
                });
            }
        });
        console.log("UserMap: ");
        userMap.forEach((user) => { console.log(user)});
        setChatUsers(Array.from(userMap.values()));
        console.log("ChatUSRES: " + chatUsers)
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();

        // Start polling
        const pollingInterval = setInterval(fetchMessages, 5000); // Poll every 5 seconds

        // Cleanup polling on unmount
        return () => clearInterval(pollingInterval);
      }, []);

 

  

  console.log(selectedUser);
  // Filter messages for the selected user
  const filteredMessages = selectedUser
    ? messages.filter(
        (message) =>
          message.sender_id === selectedUser.id ||
          message.receiver_id === selectedUser.id
      )
    : [];
  console.log()
  console.log(9999999999);
  console.log(filteredMessages);

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
                  <AvatarImage src={"1"} />
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
                      message.sender_id === selectedUser.id
                        ? "sent"
                        : "received"
                    }
                  >
                    <ChatBubbleAvatar
                      src={
                        message.sender_id === selectedUser.id
                          ? "1" // Selected user is the sender
                          : "2" // Selected user is the receiver
                      }
                      fallback={
                        message.sender_id === selectedUser.id
                          ? selectedUser.username.substring(0, 2).toUpperCase()
                          : message.receiver_username
                              .substring(0, 2)
                              .toUpperCase()
                      }
                    />
                    <ChatBubbleMessage
                      variant={
                        message.sender_id === selectedUser.id
                          ? "sent"
                          : "received"
                      }
                    >
                      {message.message_content}
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
            value = {messageContent}
            onChange={(e) => setMessageContent(e.target.value)}
          />
          <Button className="bg-blue-500 hover:bg-blue-600 text-white"
                  onClick={async () => {
                    try {
                      console.log("Trying to send message : ", messageContent);
                      await sendMessage(messageContent, currentUser?.id, selectedUser?.id);
                      setMessageContent("");
                    } catch (error) {
                      console.error(error);
                  }}}
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Messages;
