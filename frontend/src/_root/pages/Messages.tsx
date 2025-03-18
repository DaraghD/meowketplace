import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  ChatBubble,
  ChatBubbleAvatar,
  ChatBubbleMessage,
} from "@/components/ui/chat/chat-bubble";
import { ChatInput } from "@/components/ui/chat/chat-input";
import { ChatMessageList } from "@/components/ui/chat/chat-message-list";

const Messages = () => {
  return (
    <div className="flex h-[calc(100vh-4rem)] bg-gray-100">
      {/* Sidebar (1/4 width) */}
      <div className="w-1/4 bg-white border-r border-gray-200 p-4 overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Chats</h2>
        <div className="space-y-2">
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium pl-3">John Doe</p>
          </div>
          <div className="p-2 hover:bg-gray-100 rounded cursor-pointer flex">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p className="font-medium pl-3">John Dee</p>
          </div>
        </div>
      </div>

      {/* Chat Area (3/4 width) */}
      <div className="w-3/4 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 bg-white border-b border-gray-200">
          <h2 className="text-lg font-semibold">John Doe</h2>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 p-4 overflow-y-auto">
          <ChatMessageList>
            <ChatBubble variant="sent">
              <ChatBubbleAvatar fallback="US" />
              <ChatBubbleMessage variant="sent">
                Hello, how has your day been? I hope you are doing well.
              </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage variant="received">
                Hi, I am doing well, thank you for asking. How can I help you
                today?
              </ChatBubbleMessage>
            </ChatBubble>
            <ChatBubble variant="received">
              <ChatBubbleAvatar fallback="AI" />
              <ChatBubbleMessage isLoading />
            </ChatBubble>
          </ChatMessageList>
        </div>

        {/* Chat Input */}
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
