import { Product, userData } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import UserProfile from "@/components/profile/UserProfile.tsx";
import ProductCard from "../ProductCard";


interface UserProfileProps {
    business: userData;
}

const BusinessProfile: React.FC<UserProfileProps> = ({ business }) => {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/service");
                const data = await response.json();
                setProducts(data);
            }
            catch (error) {
                console.error("Error fetching products", error);
            }
        }
        fetchProducts();
    }, []);

    const userProducts = products
        .filter((product) => {
            return product.user.id === business.id;
        })
        .sort((a, b) => {
            // Sort by business rating in descending order
            return b.user.business_rating - a.user.business_rating;
        });
    return (
        <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col">
                <UserProfile user={business} />
                <div className="w-full flex flex-col items-center mt-4">
                    <h2 className="text-2xl font-bold mb-4">Business Information</h2>
                </div>
                <div className="w-full flex flex-col items-center mt-4">
                    <p className="text-lg mb-2">Business Rating: {business.business_rating}</p>
                    <div>
                        <p> Your businesses products</p>
                    </div>
                    <ul className="flex flex-col items-center space-y-4 mt-6">
                        {userProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
