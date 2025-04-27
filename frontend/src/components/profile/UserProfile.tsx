import { Product, Transaction, userData } from "@/lib/types/types";
import React, { useContext, useEffect, useState } from "react";
import { Button } from "@/components/ui/button.tsx";
import { useNavigate } from "react-router-dom";
import { Context } from "@/context.tsx";
import { Card, CardContent } from "../ui/card";
import ReportCard from "../ReportCard";
import { Report } from "@/lib/types/types.ts";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer";
import ProductCard from "../ProductCard";
import { toast } from "sonner";

interface UserProfileProps {
    user: userData;
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
    const navigate = useNavigate();
    const [reports, setReports] = useState<Report[] | null>(null);
    const context = useContext(Context);
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [productWithTransaction, setProductWithTransaction] = useState<
        { product: Product; transaction: Transaction }[]
    >([]);
    if (!context) return null;
    const { logout } = context;

    const updateDescription = async (description: String) => {
        const response = await fetch('http://localhost:8080/api/user/description', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
                description: description
            }),
        });
        const text = await response.text()
        toast(text);
    };

    console.log("LOGGING USER");
    console.log(user);
    if (!user) {
        navigate("/sign-in");
    }
    const [file, setFile] = useState<File | null>(null);

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/transactions/customer/${user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                const data: Transaction[] = await response.json();
                setTransactions(data);
                console.log("fucking piece of shit");
            } catch (err) {
                console.error("Error fetching transactions:", err);
            }
        };

        fetchTransactions();
    }, [user.id]);

    useEffect(() => {
        const fetchProductsForTransactions = async () => {
            if (transactions.length === 0) return;

            try {
                const productPromises = transactions.map((t) =>
                    fetch(`http://localhost:8080/api/service/${t.productId}`, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }).then((res) => res.json())
                );

                const fetchedProducts = await Promise.all(productPromises);
                const combined = fetchedProducts.map((product, idx) => ({
                    product,
                    transaction: transactions[idx],
                }));

                setProductWithTransaction(combined.reverse());
            } catch (err) {
                console.error("Error fetching products:", err);
            }
        };

        fetchProductsForTransactions();
    }, [transactions]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const image = files[0];
            setFile(image);
        }
    };

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/report",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data: Report[] = await response.json();
                setReports(data);
            } catch (err) {
                console.log(err);
            }
        };
        fetchReports();
    }, []);

    const uploadPicture = async () => {
        const formData = new FormData();

        if (file) {
            formData.append("profile_picture", file);
        } else {
            console.log("No file selected");
            toast("No file selected");
        }

        const response = await fetch("http://localhost:8080/api/user/picture", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        if (!response.ok) {
            throw new Error("Failed to upload image");
        }
        const data = await response.text();
        console.log(data);
    };

    const verification_hint =
        "Verified means the user has not made a purchase yet";
    return (
        <>
            <div className="flex flex-col items-start justify-start bg-gray-100 ">
                <div className="bg-white p-6 w-full flex">
                    <div className="w-1/3 flex flex-col items-start">
                        <img
                            src={`http://localhost:8080/api/user/picture/${user.id}`}
                            alt="Profile"
                            className="w-32 h-32 rounded-full mb-4"
                        />
                        <input
                            type="file"
                            className="mb-4"
                            onChange={handleFileChange}
                        />
                        <Button
                            onClick={uploadPicture}
                            className="bg-blue-500 text-white rounded hover:bg-blue-600"
                            style={{ padding: "0.5rem 1rem" }}
                        >
                            Upload Picture
                        </Button>
                        <h1 className="text-3xl font-bold mb-2">
                            {user.username}
                        </h1>
                        <p className="text-lg mb-2">Email: {user.email}</p>
                        <p
                            className="text-lg mb-2 underline cursor-help"
                            title={verification_hint}
                        >
                            {user.is_verified ? "Verified" : "Not Verified"}
                        </p>
                        <Drawer>
                            <DrawerTrigger>
                                <Button>View Reports</Button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <DrawerHeader>
                                    <DrawerTitle>User Reports</DrawerTitle>
                                    <DrawerDescription>
                                        Reports for this user.
                                    </DrawerDescription>
                                </DrawerHeader>
                                <div className="p-4 overflow-y-auto">
                                    {reports &&
                                        [...reports] // Create a copy to avoid modifying the original array
                                            .sort((a, b) => b.id - a.id)
                                            .map((report) => (
                                                <ReportCard
                                                    key={report.id}
                                                    report={report}
                                                />
                                            ))}
                                    {reports && reports.length === 0 && (
                                        <Card>
                                            <CardContent>
                                                <p>No reports found.</p>
                                            </CardContent>
                                        </Card>
                                    )}
                                </div>
                            </DrawerContent>
                        </Drawer>
                        <Button
                            onClick={() => {
                                logout();
                            }}
                            className="bg-red-500 text-white rounded hover:bg-red-400"
                            style={{ padding: "0.5rem 1rem" }}
                        >
                            Logout
                        </Button>
                    </div>
                    <div className="w-full flex flex-col items-center">
                        <h2 className="text-3xl font-bold mb-4">Bio</h2>
                        <textarea
                            placeholder={
                                user.bio && user.bio !== "null"
                                    ? user.bio
                                    : "Make a bio!"
                            }
                            className="w-64 h-32 p-2 border border-gray-300 rounded"
                        ></textarea>
                        <p id="error_text" className="hidden">
                            {" "}
                            No changes made
                        </p>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                            onClick={() => {
                                const bio_text =
                                    document.querySelector("textarea")?.value;
                                if (
                                    !bio_text ||
                                    bio_text === "null" ||
                                    bio_text === user.bio
                                ) {
                                    document
                                        .querySelector("#error_text")
                                        ?.classList.remove("hidden");
                                } else {
                                    //post user to backend
                                    updateDescription(bio_text);
                                }
                            }}
                        >
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
                <h2 className="text-2xl font-bold mb-4">Service History</h2>
            </div>
            <div className="w-full flex flex-col items-center mt-4">
                <ul className="flex flex-col items-center space-y-4 mt-6">
                    {productWithTransaction.map(({ product, transaction }) => (
                        <div key={product.id} className="w-full">
                            <ProductCard product={product} />
                            <p className="text-sm text-gray-600 mt-1 ml-4">
                                Status: {transaction.status}
                            </p>
                        </div>
                    ))}
                </ul>
            </div>
        </>
    );
};
export default UserProfile;
