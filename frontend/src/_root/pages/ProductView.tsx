import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Product, Tier } from "@/lib/types/types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "@/components/Reviews";
import { renderStars, sendMessage } from "@/lib/utils";
import { Context } from "@/context";
import ReportButton from "@/components/Report";

const ProductView = () => {
    const [hasSentInquiry, setHasSentInquiry] = useState(false);
    const [product, setProduct] = useState<Product | null>();
    const [productLoading, setProductLoading] = useState<boolean>(true);
    const [selectedTier, setSelectedTier] = useState<Tier | null>();
    const id = useParams();
    const [isActiveServiceInquiry, setIsActiveServiceInquiry] = useState(false);

    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user } = context;

    useEffect(() => {
        console.log("user", user);
        console.log("product", product);

        const fetchRelTrans = async () => {
            try {
                if (!user || !product) return;

                const response = await fetch(
                    `http://localhost:8080/api/transactions/customer/${user.id}/business/${product.user.id}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch transactions");
                }

                console.log("helo");

                const transactions = await response.json();
                const sortedTransactions = transactions.sort(
                    (a: any, b: any) => b.id - a.id
                );

                const hasPendingTransaction =
                    sortedTransactions.length > 0 &&
                    sortedTransactions[0].status === "pending";

                console.log(sortedTransactions);

                setIsActiveServiceInquiry(hasPendingTransaction);
                console.log(transactions);
                console.log(isActiveServiceInquiry);
            } catch (error) {
                console.error("Error fetching transactions", error);
            }
        };
        fetchRelTrans();
    }, [user, product]);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetch(
                    `http://localhost:8080/api/service/${id.id}`
                );
                const product = await response.json();
                setProduct(product);
                console.log(product);
            } catch (error) {
                console.error("Error fetching products", error);
            } finally {
                setProductLoading(false);
            }
        };
        fetchProduct();
    }, []);

    const sendServiceInquiry = async () => {
        console.log("isActiveServiceInquiry", isActiveServiceInquiry);
        if (isActiveServiceInquiry) {
            toast.error(
                "You already have a active service inquiry with this seller"
            );
            return;
        }

        if (!product || hasSentInquiry) return;

        if (!user) {
            toast.error("You need to be logged in to send a service inquiry");
            return;
        }

        try {
            await sendMessage(
                `--Service Inquiry--\n ${selectedTier?.name}`,
                user.id,
                product.user.id
            );
            toast.success("Response sent successfully");
            setHasSentInquiry(true);
        } catch (error) {
            console.error("Error sending response:", error);
            toast.error("Failed to send response");
        }

        const transactionResponse = await fetch(
            `http://localhost:8080/api/transactions`,
            {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: user.id,
                    productId: product.id,
                    businessId: product.user.id,
                    status: "pending",
                }),
            }
        );
        if (!transactionResponse.ok) {
            throw new Error("Failed to create transaction record");
        }
    };

    const rating = product?.starRating;
    const priceSorted = product?.tiers
        .slice()
        .sort((a, b) => a.price - b.price);
    let highestPrice = null;
    let lowestPrice = null;
    if (priceSorted) {
        highestPrice = priceSorted[priceSorted?.length - 1].price;
        lowestPrice = priceSorted[0].price;
    }

    if (productLoading) {
        return <div> Loading... </div>;
    }
    if (product?.reviews === null) {
        return;
    }

    return (
        <div>
            <div className="flex flex-col md:flex-row h-1/4">
                <div className="flex flex-col w-full md:w-1/2 max-h-1/3 p-5">
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {Array.from(
                                { length: product?.imageCount ?? 0 },
                                (_, index) => (
                                    <CarouselItem key={index}>
                                        <div className="aspect-square md:aspect-[4/3] w-full relative">
                                            <img
                                                src={`http://localhost:8080/api/service/picture/${product?.id}/${index}`}
                                                alt={`Product image ${
                                                    index + 1
                                                }`}
                                                className="w-full h-full object-contain rounded-lg"
                                            />
                                        </div>
                                    </CarouselItem>
                                )
                            )}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <p className="pr-2">
                        {rating} <span>{renderStars(product?.starRating)}</span>
                        <ReportButton type="product" id={product?.id} />
                    </p>
                </div>
                <div className="pl-10 flex flex-col p-5 gap-4 w-full md:w-1/2">
                    <div className="flex">
                        <h1 className="text-3xl font-bold pt-5">
                            {product?.name}
                        </h1>

                        <DropdownMenu>
                            <DropdownMenuTrigger className="pl-5 pt-5">
                                <Button className="cursor-pointer ">
                                    Available Tiers
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {product?.tiers.map((tier, index) => (
                                    <DropdownMenuItem
                                        key={index}
                                        onClick={() => setSelectedTier(tier)}
                                    >
                                        {tier.name} : €{tier.price}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="relative group inline-block">
                        <p className="cursor-pointer">
                            from{" "}
                            <span className="underline">
                                {product?.user.username}
                            </span>
                        </p>
                        <div className="absolute hidden group-hover:block z-10 w-64 p-2 mt-1 text-sm bg-white border border-gray-200 rounded shadow-lg">
                            {product?.user.bio || "No bio available"}
                        </div>
                    </div>
                    €{lowestPrice} - €{highestPrice}
                    <p>Tag: {product?.tag}</p>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        {selectedTier
                            ? selectedTier.description
                            : product?.productText}
                    </ScrollArea>
                    <p>
                        {" "}
                        {selectedTier
                            ? `${selectedTier.name} : €${selectedTier.price}`
                            : "Select a tier to see prices"}
                    </p>
                    <Button
                        className="cursor-pointer mt-auto mb-10 flex"
                        onClick={sendServiceInquiry}
                        disabled={hasSentInquiry}
                    >
                        {selectedTier?.name == "" || selectedTier == null
                            ? "Send general service inquiry"
                            : `Send service inquiry for ${selectedTier?.name}`}{" "}
                        <span>
                            <img
                                src="/assets/icons/MessageIcon.png"
                                className="w-7 h-auto"
                            />
                        </span>
                    </Button>
                </div>
            </div>
            <hr />
            <Reviews reviews={product?.reviews} productID={product?.id} />
        </div>
    );
};

export default ProductView;
