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

  export interface Product {
    id: number;
    user: User;
    productText: string;
    price: number;
    starRating: number;
    createdAt: Date;
    reviews: Review[];
}

export interface Review {
  id: number;
  user: User;
  product: Product;
  reviewText: string;
  starRating: number;
  createdAt: Date;
}