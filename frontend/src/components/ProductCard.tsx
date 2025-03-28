import React from "react";
import { Product } from "@/lib/types/types";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
    product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const navigate = useNavigate();
    const thumbnail = `http://localhost:8080/api/service/picture/${product.id}/0`
    return (
        <div
            onClick={() => {
                navigate(`/product/${product.id}`);
            }}
            className="w-96 h-32 border rounded-lg shadow-md bg-white flex cursor-pointer">
            <img
                src={thumbnail}
                alt={product.name}
                className="h-full w-24 object-cover rounded-l-lg"
            />

            <div className="flex flex-col justify-center p-4 flex-grow">
                <h2 className="text-lg font-bold">{product.name}</h2>
                <p className="text-gray-700 text-sm">{product.productText}</p>
                <p className="text-sm text-gray-500">⭐ {product.starRating ?? "No rating"}</p>
            </div>
        </div>
    );
};

export default ProductCard;
