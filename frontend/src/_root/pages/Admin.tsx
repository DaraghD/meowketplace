import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types/types";
import { Review } from "@/lib/types/types";

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [view, setView] = useState<"products" | "reviews">("products"); // State to track current view

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/service/products");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/service/reviews");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            }
        };

        fetchProducts();
        fetchReviews();
    }, []);

    const deleteReview = (id: number) => {
        const checkProduct = (product: Product) => product.id !== id;

        fetch(`http://localhost:8080/api/product/${id}`, { method: "DELETE" })
            .then(() => setProducts(products.filter(checkProduct)))
            .catch(error => console.error("Error deleting product:", error));
    };

    const banUser = (id: number) => {
        const checkUser = (user: any) => user.id !== id;

        fetch(`http://localhost:8080/api/users/${id}`, { method: "DELETE" })
            .then(() => setUsers(users.filter(checkUser)))
            .catch(error => console.error("Error banning user:", error));
    };

    const deleteProduct = (id: number) => {
        const checkProduct = (product: Product) => product.id !== id;

        fetch(`http://localhost:8080/api/product/${id}`, { method: "DELETE" })
            .then(() => setProducts(products.filter(checkProduct)))
            .catch(error => console.error("Error deleting product:", error));
    };

    let display = null;

    if (view === "products" && products.length > 0) {
        display = products.map((product) => (
            <tr key={product.id}>
                <td colSpan={4}>
                    <ProductCard product={product} />
                    <div>
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => deleteProduct(product.id)} // Fix deleteProduct
                        >
                            Delete
                        </Button>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => banUser(product.user.id)}
                        >
                            Ban
                        </Button>
                    </div>
                </td>
            </tr>
        ));
    } else if (view === "reviews" && reviews.length > 0) {
        display = reviews.map((review) => (
            <tr key={review.id}>
                <td colSpan={4}>
                    <div>
                        <div>{review.user_id}</div>
                        <div>{review.stars}</div>
                        <div>{review.review_content}</div>
                        <Button
                            className="bg-red-500 hover:bg-red-600 text-white"
                            onClick={() => deleteReview(review.id)}
                        >
                            Delete
                        </Button>
                        <Button
                            className="bg-yellow-500 hover:bg-yellow-600 text-white"
                            onClick={() => banUser(review.user_id)}
                        >
                            Ban
                        </Button>
                    </div>
                </td>
            </tr>
        ));
    }

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Admin - Review Management</h1>

            <div className="mb-4">
                <Button
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                    onClick={() => setView(view === "products" ? "reviews" : "products")}
                >
                    Switch to {view === "products" ? "Reviews" : "Products"}
                </Button>
            </div>

            <div className="overflow-x-auto">
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-700 uppercase text-sm">
                            <th>Item</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{display}</tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProducts;
