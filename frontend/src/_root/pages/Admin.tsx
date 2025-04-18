import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import { Product } from "@/lib/types/types";
import { Review } from "@/lib/types/types";

const AdminProducts: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [reviews, setReviews] = useState<Review[]>([]);
    const [users, setUsers] = useState<any[]>([]);
    const [display, setDisplay] = useState<"products" | "reviews">("products");

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/service");
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products", error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await fetch("http://localhost:8080/api/review");
                const data = await response.json();
                setReviews(data);
            } catch (error) {
                console.error("Error fetching reviews", error);
            }
        };

        fetchProducts();
        fetchReviews();
    }, []);

    const deleteReview = async (id: number) => {
        const checkReview = (review: Review) => review.id !== id;

        try {
            const response = await fetch("http://localhost:8080/api/review", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id })
            });
            if (response.status === 200) {
                console.log("success")
                setReviews(reviews.filter(checkReview))
            }

        } catch (error) {
            console.log(error)
        }
    };

    const banUser = async (id: number) => {
        const checkUser = (user: any) => user.id !== id;

        try {
            const response = await fetch("http://localhost:8080/api/users", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id })
            });
            if (response.status === 200) {
                console.log("success")
                setUsers(users.filter(checkUser))
            }
        } catch (error) {
            console.log(error)
        }
    };

    const deleteProduct = async (id: number) => {
    const checkProduct = (product: Product) => product.id !== id;

        try {
            const response = await fetch("http://localhost:8080/api/service", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
                body: JSON.stringify({ id })
            });
            if (response.status === 200) {
                console.log("success")
                setProducts(products.filter(checkProduct))
            }
        } catch (error) {
            console.log(error)
        };
    };

    let adminView = null;

    if (display === "products" && products.length > 0) {
        adminView = products.map((product) => (
            <tr key={product.id}>
                <td>
                    <ProductCard product={product} />
                    <div>
                        <Button
                            onClick={() => deleteProduct(product.id)}
                        >
                            Delete
                        </Button>
                        <Button
                            onClick={() => banUser(product.user.id)}
                        >
                            Ban
                        </Button>
                    </div>
                </td>
            </tr>
        ));
    } else if (display === "reviews" && reviews.length > 0) {
        adminView = reviews.map((review) => (
            <tr key={review.id}>
                <td>
                    <div>
                        <div>{review.user_id}</div>
                        <div>{review.stars}</div>
                        <div>{review.review_content}</div>
                        <Button
                            onClick={() => deleteReview(review.id)}
                        >
                            Delete
                        </Button>
                        <Button
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
            <h1 className="text-2xl font-bold mb-4">Admin Tab</h1>

            <div className="mb-4">
                <Button
                    onClick={() => setDisplay(display === "products" ? "reviews" : "products")}
                >
                    Switch View
                </Button>
            </div>

            <div>
                <table>
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>{adminView}</tbody>
                </table>
            </div>
        </div>
    );
};
export default AdminProducts;
