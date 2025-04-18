import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function renderStars(rating: number | null | undefined) {
  if (rating === null || rating === undefined) {
    return "no rating";
  }

  switch (Math.floor(rating)) {
    case 1:
      return "⭐☆☆☆☆";
    case 2:
      return "⭐⭐☆☆☆";
    case 3:
      return "⭐⭐⭐☆☆";
    case 4:
      return "⭐⭐⭐⭐☆";
    case 5:
      return "🌟🌟🌟🌟🌟";
    default:
      return "No rating";
  }
};
export const sendMessage = async (messageContent: string, sender_id: number | undefined, receiver_id: number | undefined) => {
  console.log("Sending message: ", messageContent);
  //todo: remove this , if (!selectedUser) return;

  const message = {
    message_content: messageContent,
    sender_id: sender_id, //currentUser?.id, // Replace with actual sender ID
    receiver_id: receiver_id//selectedUser.id,
  };

  console.log(message);

  try {
    const response = await fetch("http://localhost:8080/api/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json", //todo: add token
        "Access-Control-Allow-Origin": "*",
        "Authorization": `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

  } catch (error) {
    console.error("Error sending message:", error);
  }
};
