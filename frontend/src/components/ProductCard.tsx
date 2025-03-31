import React from "react";
import { Product } from "@/lib/types/types";
import { useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const thumbnail = `http://localhost:8080/api/service/picture/${product.id}/0`;

    let minPrice = Infinity;
    let maxPrice = -Infinity;

    if (product.tiers && product.tiers.length > 0) {
        product.tiers.forEach((tier) => {
            minPrice = Math.min(minPrice, tier.price);
            maxPrice = Math.max(maxPrice, tier.price);
        });
    }

    return (
        <div
            onClick={() => {
                navigate(`/product/${product.id}`);
            }}
            className="w-[75vw] h-40 border rounded-lg shadow-md bg-white flex cursor-pointer" // make this relative ? mobile/small screens?
        >
            <img
                src={thumbnail}
                alt={product.name}
                className="h-full w-32 flex-shrink-0 object-cover rounded-l-lg"
            />

            <div className="flex flex-col justify-center p-4 flex-grow">
                <h2 className="text-lg font-bold truncate">{product.name}</h2>
                <p className="text-gray-700 text-sm line-clamp-2 break-words">
                    {product.productText}
                </p>
                <div className="flex flex-wrap gap-1 mt-1">
                    <p className="text-sm text-gray-500">
                        ⭐ {product.starRating ?? "No rating"}
                    </p>
                    {product.tiers && product.tiers.length > 0 && (
                        <p className="text-sm text-gray-600">
                            ${minPrice} - ${maxPrice}
                        </p>
                    )}
                </div>
            </div>

            <div className="hidden md:flex flex-col justify-center p-4 w-60">
                <div className="flex items-center">
                    <p className="text-sm font-semibold mr-2 max-w-[100px] truncate">
                        {product.user.username}
                    </p>
                    <Avatar className="h-8 w-8 rounded-full">
                        <AvatarImage
                            src={`http://localhost:8080/api/user/picture/${product.user?.id}`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </div>
                <p className="text-sm text-gray-500">
                    Business Rating:{" "}
                    {product.user.business_rating?.toFixed(2) ?? "No rating"}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
