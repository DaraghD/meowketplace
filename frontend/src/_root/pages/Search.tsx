import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types/types";
import { useEffect, useState } from "react";

const Products = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    }

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

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // component that takes in product as prop, loop over products and fill in components 
    return (
        <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-lg">
                <input
                    type="text"
                    className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <ul className="flex flex-col items-center space-y-4 mt-6">
                {filteredProducts.map((product) => (

                    <ProductCard key={product.id} product={product} />
                ))}
            </ul>
        </div >
    );
};

export default Products;
