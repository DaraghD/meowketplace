export interface Message_User {
    id: number;
    username: string;
    is_verified: boolean;
  }

  export interface Message {
    id: number;
    sender_id: number;
    receiver_id: number;
    sender_username: string;
    receiver_username: string;
    sender_verified: boolean;
    receiver_verified: boolean;
    messageContent: string; 
    createdAt: Date; 
  }