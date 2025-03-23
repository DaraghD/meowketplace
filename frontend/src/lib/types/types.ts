export interface Message_User {
    id: number;
    username: string;
    is_verified: boolean;
}

export interface userData {
    id: number;
    username: string;
    email: string;
    password: string;
    bio: string;
    is_business: boolean;
    is_verified: boolean;
    profile_picture: string;
    is_admin: boolean;
    is_banned: boolean;
    business_rating: number;
}

export interface User {
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
    message_content: string;
    created_at: Date;
}

export interface Tier {
    id: number;
    product: Product;
    price: number;
    name: string;
}
export interface AddTier {
    price: number;
    name: string;
}

export interface AddProduct {
    name: string;
    productText: string;
    tag: string;
    tiers: AddTier[];
}
export interface Product {
    id: number;
    user: User;
    productText: string;
    price: number;
    starRating: number;
    createdAt: Date;
    reviews: Review[];
    tiers: Tier[];
}

export interface Review {
    id: number;
    user: User;
    product: Product;
    reviewText: string;
    starRating: number;
    createdAt: Date;
}