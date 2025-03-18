export interface User {
    id: string;
    username: string;
    avatarUrl: string;
    is_verified: boolean;
  }

  export interface Message {
    id: number;
    sender: User; 
    receiver: User;
    messageContent: string; 
    createdAt: Date; 
  }