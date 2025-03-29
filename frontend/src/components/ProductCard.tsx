import React from "react";
import { Product } from "@/lib/types/types";
import { useNavigate } from "react-router-dom";

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
            className="w-[50vw] h-32 border rounded-lg shadow-md bg-white flex cursor-pointer"// make this relative ? mobile/small screens?
        >
            <img
                src={thumbnail}
                alt={product.name}
                className="h-full w-24 object-cover rounded-l-lg"
            />

            <div className="flex flex-col justify-center p-4 flex-grow">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-700 text-sm">{product.productText}</p>
                <p className="text-sm text-gray-500">⭐ {product.starRating ?? "No rating"}</p>
                {product.tiers && product.tiers.length > 0 && (
                    <p className="text-sm text-gray-600">
                        Price: ${minPrice} - ${maxPrice}
                    </p>
                )}
            </div>

            <div className="flex flex-col justify-center p-4 w-48">
                <p className="text-sm font-semibold">{product.user.username}</p>
                <p className="text-sm text-gray-500">
                    Business Rating: {product.user.business_rating?.toFixed(2) ?? "No rating"}
                </p>
            </div>
        </div>
    );
};

export default ProductCard;
