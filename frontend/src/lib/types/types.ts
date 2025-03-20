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