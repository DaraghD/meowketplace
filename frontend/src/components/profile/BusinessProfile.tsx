import { Product, userData } from "@/lib/types/types";
import React, { useEffect, useState } from "react";
import UserProfile from "@/components/profile/UserProfile.tsx";
import ProductCard from "../ProductCard";
import { Button } from "../ui/button";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import { toast } from "sonner";

interface UserProfileProps {
    business: userData;
}

const BusinessProfile: React.FC<UserProfileProps> = ({ business }) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [pendingTags, setPendingTags] = useState<string[]>([]);
    const [availableTags] = useState<string[]>([
        "Grooming",
        "Walking",
        "Training",
        "Pet Sitting",
        "Veterinary",
        "Pet Photography",
        "Pet Supplies",
        "Microchipping",
        "Pet Adoption",
    ]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/service"
                );
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };
        fetchProducts();

        if (business.business_tags) {
            try {
                const parsedTags = JSON.parse(business.business_tags);
                if (Array.isArray(parsedTags)) {
                    setSelectedTags(parsedTags);
                    setPendingTags(parsedTags);
                }
            } catch (e) {
                const tagsArray = business.business_tags
                    .split(",")
                    .map((tag) => tag.trim());
                setSelectedTags(tagsArray);
                setPendingTags(tagsArray);
            }
        }
    }, [business.business_tags]);

    const handleTagSelect = (tag: string) => {
        if (!pendingTags.includes(tag)) {
            setPendingTags([...pendingTags, tag]);
        }
    };

    const handleTagDelete = (tag: string) => {
        setPendingTags(pendingTags.filter((t) => t !== tag));
    };

    const updateBusinessTags = async () => {
        try {
            const response = await fetch("http://localhost:8080/api/user/tag", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({
                    tag: pendingTags.join(", "), // Convert array to comma-separated string
                }),
            });

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || "Failed to update tags");
            }

            const result = await response.text();
            setSelectedTags([...pendingTags]);
            toast.success(result);
        } catch (error) {
            console.error("Error updating tags:", error);
            toast.error("Failed to update tags");
            // Revert to last saved tags if update fails
            setPendingTags([...selectedTags]);
        }
    };

    const userProducts = products
        .filter((product) => product.user.id === business.id)
        .sort((a, b) => b.user.business_rating - a.user.business_rating);

    const hasChanges =
        JSON.stringify(selectedTags) !== JSON.stringify(pendingTags);

    return (
        <div className="flex flex-col items-start justify-start min-h-screen bg-gray-100 p-4">
            <div className="bg-white shadow-md rounded-lg p-6 w-full flex flex-col">
                <UserProfile user={business} />
                <div className="w-full flex flex-col items-center mt-4">
                    <h2 className="text-2xl font-bold mb-4">
                        Business Information
                    </h2>

                    <p className="text-lg mb-2">
                        Business Rating: {business.business_rating}
                    </p>

                    <div className="mb-6 w-full">
                        <h3 className="font-medium mb-2">
                            Business Tags(click to remove):
                        </h3>
                        {pendingTags.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                                {pendingTags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm cursor-pointer hover:bg-blue-200 hover:line-through"
                                        onClick={() => handleTagDelete(tag)}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-500">No tags selected</p>
                        )}
                    </div>

                    <div className="w-full mb-6">
                        <label className="block text-sm font-medium mb-2">
                            Add Services:
                        </label>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="w-full">
                                    Select Services ↓
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-56 bg-white shadow-lg rounded-md p-1 border border-gray-200">
                                {availableTags
                                    .filter((tag) => !pendingTags.includes(tag))
                                    .map((tag) => (
                                        <DropdownMenuItem
                                            key={tag}
                                            className="p-2 hover:bg-gray-100 cursor-pointer rounded-sm"
                                            onClick={() => handleTagSelect(tag)}
                                        >
                                            {tag}
                                        </DropdownMenuItem>
                                    ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <Button
                        onClick={updateBusinessTags}
                        disabled={!hasChanges}
                        className={`w-full ${hasChanges
                                ? "bg-blue-600 hover:bg-blue-700"
                                : "bg-gray-400 cursor-not-allowed"
                            }`}
                    >
                        Update Tags
                    </Button>
                </div>

                <div className="w-full flex flex-col items-center mt-4">
                    <h3 className="text-xl font-semibold mb-4">
                        Your Business Products
                    </h3>
                    <ul className="flex flex-col items-center space-y-4 mt-6 w-full">
                        {userProducts.length > 0 ? (
                            userProducts.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                />
                            ))
                        ) : (
                            <p className="text-gray-500">No products found</p>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default BusinessProfile;
