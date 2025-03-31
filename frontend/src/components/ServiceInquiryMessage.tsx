import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Message } from "@/lib/types/types";

interface ServiceInquiryMessageProps {
    message: Message;
    currentUserId: number;
    onResponse: (response: string) => Promise<void>;
}

export const ServiceInquiryMessage = ({
    message,
    currentUserId,
    onResponse,
}: ServiceInquiryMessageProps) => {
    const isReceiver = message.receiver_id === currentUserId;
    const [isResponded, setIsResponded] = useState(false);

    const handleResponse = async (response: string) => {
        setIsResponded(true);
        await onResponse(response);
    };

    const handleAccept = async () => {
        await handleResponse("--Service Inquiry Accepted--");
    };

    const handleDecline = async () => {
        await handleResponse("--Service Inquiry Declined--");
    };

    return (
        <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 my-2">
            <p>{message.message_content}</p>
            {isReceiver && (
                <div className="flex gap-2 mt-2">
                    <Button
                        onClick={handleAccept}
                        className="bg-green-500 hover:bg-green-600 text-white"
                        disabled={isResponded}
                    >
                        Accept
                    </Button>
                    <Button
                        onClick={handleDecline}
                        className="bg-red-500 hover:bg-red-600 text-white"
                        disabled={isResponded}
                    >
                        Decline
                    </Button>
                </div>
            )}
        </div>
    );
};
