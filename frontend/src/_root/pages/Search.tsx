import ProductCard from "@/components/ProductCard";
import Rating from "@/components/Rating";
import SearchInput from "@/components/SearchInput";
import { Product } from "@/lib/types/types";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [minPrice, setMinPrice] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [minStars, setMinStars] = useState("");

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
    }, []);
    const filteredProducts = products
        .filter((product) => {
            const searchTermLower = searchTerm.toLowerCase();

            const nameMatch = product.name
                .toLowerCase()
                .includes(searchTermLower);
            const descriptionMatch = product.productText
                .toLowerCase()
                .includes(searchTermLower);

            let tierMatch = false;
            if (product.tiers && product.tiers.length > 0) {
                product.tiers.forEach((tier) => {
                    if (
                        tier.name.toLowerCase().includes(searchTermLower) ||
                        (tier.description &&
                            tier.description
                                .toLowerCase()
                                .includes(searchTermLower))
                    ) {
                        tierMatch = true;
                    }
                });
            }

            const nameDescriptionTierMatch =
                nameMatch || descriptionMatch || tierMatch;

            let productHasPriceInRange = true;
            if (minPrice || maxPrice) {
                productHasPriceInRange = false;
                if (product.tiers && product.tiers.length > 0) {
                    product.tiers.forEach((tier) => {
                        const tierPrice = tier.price;
                        if (
                            (!minPrice || tierPrice >= parseFloat(minPrice)) &&
                            (!maxPrice || tierPrice <= parseFloat(maxPrice))
                        ) {
                            productHasPriceInRange = true;
                        }
                    });
                }
            }

            const ratingMatch =
                !minStars || product.starRating >= parseFloat(minStars);

            return (
                nameDescriptionTierMatch &&
                productHasPriceInRange &&
                ratingMatch
            );
        })
        .sort((a, b) => {
            // Sort by business rating in descending order
            return b.user.business_rating - a.user.business_rating;
        });

    // component that takes in product as prop, loop over products and fill in components
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
            <div className="gap-3 flex max-w-lg mt-8">
                <SearchInput
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Rating
                    value={minStars}
                    onChange={(e) => setMinStars(e.target.value)}
                />
            </div>
            <div className="flex space-x-2 mt-6 mb-6">
                <div className="relative">
                    <div className="absolute text-gray-500 top-1/2 transform -translate-y-1/2 ml-1">
                        €
                    </div>
                    <input
                        type="number"
                        className="bg-white w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2"
                        placeholder="Min Price"
                        value={minPrice}
                        min="0"
                        onChange={(e) => setMinPrice(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <div className="absolute text-gray-500 top-1/2 transform -translate-y-1/2 ml-1">
                        €
                    </div>
                    <input
                        type="number"
                        className="bg-white w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2"
                        placeholder="Max Price"
                        value={maxPrice}
                        min="0"
                        onChange={(e) => setMaxPrice(e.target.value)}
                    />
                </div>
            </div>

            {filteredProducts.length === 0 ? (
                <p className="text-gray-500 mt-8">No products found...</p>
            ) : (
                <ul className="flex flex-col items-center space-y-4 mt-8">
                    {filteredProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </ul>
            )}
        </div>
    );
};
export default Products;
