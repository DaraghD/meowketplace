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
    const [isEditingBio, setIsEditingBio] = useState(false);
    const [bioText, setBioText] = useState(user.bio || "");
    const [file, setFile] = useState<File | null>(null);

    if (!context) return null;
    const { logout, uploadTrigger, triggerUpload } = context;

    console.log("LOGGING USER");
    console.log(user);
    if (!user) {
        navigate("/sign-in");
    }

    useEffect(() => {
        setBioText(user.bio || "");
    }, [user.bio]);

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

    const updateDescription = async (description: string) => {
        try {
            const response = await fetch(
                "http://localhost:8080/api/user/description",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: JSON.stringify({
                        description: description,
                    }),
                }
            );
            if (!response.ok) {
                throw new Error("Failed to update bio");
            }
            const text = await response.text();
            toast.success(text);
            setIsEditingBio(false);
        } catch (error) {
            toast.error("Failed to update bio");
            console.error("Error updating bio:", error);
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
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/api/user/picture",
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem(
                            "token"
                        )}`,
                    },
                    body: formData,
                }
            );
            if (!response.ok) {
                const errorData = await response.text();
                console.error("Failed to upload image:", errorData);
                toast.error(`Failed to upload image: ${errorData}`);
                return;
            }
            const data = await response.text();
            console.log("Upload successful:", data);
            toast.success("Profile picture uploaded successfully!");
            triggerUpload(); // Use context's triggerUpload instead of local state
        } catch (error) {
            console.error("Error uploading image:", error);
            toast.error("An unexpected error occurred during upload.");
        }
    };

    const verification_hint =
        "Verified means the user has not made a purchase yet";

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Profile Header Section */}
            <div className="bg-white shadow-sm">
                <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row gap-8">
                        <div className="w-full md:w-1/3 flex flex-col items-center md:items-start space-y-6">
                            <div className="relative group">
                                <img
                                    src={`http://localhost:8080/api/user/picture/${user.id}?v=${uploadTrigger}`}
                                    alt="Profile"
                                    className="w-32 h-32 rounded-full object-cover border-4 border-gray-200 group-hover:border-blue-500 transition-colors"
                                />
                            </div>

                            <div className="w-full space-y-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">
                                    Change Profile Picture
                                </label>
                                <input
                                    type="file"
                                    onChange={handleFileChange}
                                    className="block w-full text-sm text-gray-500
                                    file:mr-4 file:py-2 file:px-4
                                    file:rounded-md file:border-0
                                    file:text-sm file:font-semibold
                                    file:bg-blue-50 file:text-blue-700
                                    hover:file:bg-blue-100"
                                />
                                <Button
                                    onClick={uploadPicture}
                                    className="hover:cursor-pointer w-full bg-blue-600 hover:bg-blue-700 text-white"
                                >
                                    Upload Picture
                                </Button>
                            </div>

                            <div className="w-full flex flex-col space-y-3">
                                <Drawer>
                                    <DrawerTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className="hover:cursor-pointer w-full"
                                        >
                                            View Reports
                                        </Button>
                                    </DrawerTrigger>
                                    <DrawerContent>
                                        <DrawerHeader>
                                            <DrawerTitle>
                                                User Reports
                                            </DrawerTitle>
                                            <DrawerDescription>
                                                Reports for this user.
                                            </DrawerDescription>
                                        </DrawerHeader>
                                        <div className="p-4 overflow-y-auto max-h-[60vh]">
                                            {reports &&
                                                [...reports]
                                                    .sort((a, b) => b.id - a.id)
                                                    .map((report) => (
                                                        <ReportCard
                                                            key={report.id}
                                                            report={report}
                                                        />
                                                    ))}
                                            {reports &&
                                                reports.length === 0 && (
                                                    <Card>
                                                        <CardContent className="p-4">
                                                            <p className="text-gray-500">
                                                                No reports
                                                                found.
                                                            </p>
                                                        </CardContent>
                                                    </Card>
                                                )}
                                        </div>
                                    </DrawerContent>
                                </Drawer>

                                <Button
                                    onClick={() => logout()}
                                    className="w-full hover:cursor-pointer"
                                >
                                    Logout
                                </Button>
                            </div>
                        </div>

                        {/* Right Column - Profile Info */}
                        <div className="w-full md:w-2/3 space-y-6">
                            <div className="bg-white p-6 rounded-lg">
                                <div className="flex items-center mb-6">
                                    <h1 className="text-3xl font-bold text-gray-900 mr-4">
                                        {user.username}
                                    </h1>
                                    <span
                                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                            user.is_verified
                                                ? "bg-green-100 text-green-800"
                                                : "bg-yellow-100 text-yellow-800"
                                        } cursor-help`}
                                        title={verification_hint}
                                    >
                                        {user.is_verified
                                            ? "Verified"
                                            : "Not Verified"}
                                    </span>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Email
                                        </h3>
                                        <p className="mt-1 text-lg text-gray-900">
                                            {user.email}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-gray-500">
                                            Bio
                                        </h3>
                                        {isEditingBio ? (
                                            <div className="mt-2 space-y-2">
                                                <textarea
                                                    className="w-full p-4 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                                                    rows={4}
                                                    value={bioText}
                                                    onChange={(e) =>
                                                        setBioText(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={
                                                        user.bio &&
                                                        user.bio !== "null"
                                                            ? user.bio
                                                            : "Make a bio!"
                                                    }
                                                />
                                                <div className="flex space-x-2">
                                                    <Button
                                                        onClick={() => {
                                                            updateDescription(
                                                                bioText
                                                            );
                                                        }}
                                                        className="bg-blue-600 hover:bg-blue-700 text-white"
                                                    >
                                                        Save
                                                    </Button>
                                                    <Button
                                                        variant="outline"
                                                        onClick={() => {
                                                            setIsEditingBio(
                                                                false
                                                            );
                                                            setBioText(
                                                                user.bio || ""
                                                            );
                                                        }}
                                                    >
                                                        Cancel
                                                    </Button>
                                                </div>
                                            </div>
                                        ) : (
                                            <div
                                                className="mt-2 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer"
                                                onClick={() =>
                                                    setIsEditingBio(true)
                                                }
                                            >
                                                {bioText &&
                                                bioText !== "null" ? (
                                                    <p className="text-gray-700 whitespace-pre-line">
                                                        {bioText}
                                                    </p>
                                                ) : (
                                                    <p className="text-gray-400 italic">
                                                        Click to add a bio...
                                                    </p>
                                                )}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Service History Section */}
            <div className="w-full flex flex-col items-center mt-4">
                <h2 className="text-2xl font-bold ">Service History</h2>
            </div>
            <div className="w-full flex flex-col items-center ">
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
        </div>
    );
};

export default UserProfile;
