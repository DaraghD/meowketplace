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
import { Product } from "@/lib/types/types";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Reviews from "@/components/Reviews";
import { renderStars } from "@/lib/utils";
import { Context } from "@/context";

const ProductView = () => {
    const [product, setProduct] = useState<Product | null>();
    const [productLoading, setProductLoading] = useState<boolean>(true);
    const id = useParams();

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

    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user } = context;

    const sendServiceInquiry = async () => {
        if (!product) return;

        if (!user) {
            toast.error("You need to be logged in to send a service inquiry");
            return;
        }

        try {
            const response = await fetch(
                "http://localhost:8080/sendServiceInquiry",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sender_id: user.id,
                        receiver_id: product.user.id,
                        message_content: "--Service Inquiry--",
                    }),
                }
            );

            if (response.ok) {
                toast.success("Service Inquiry sent!");
            } else {
                throw new Error("Failed to send message");
            }
        } catch (error) {
            console.error("Error sending message:", error);
            toast.error("Failed to send Service Inquiry");
        }
    };

    // const form = useForm<z.infer<typeof ReviewValidation>>({
    //     resolver: zodResolver(ReviewValidation),
    //     defaultValues: {
    //         rating: 0,
    //         text: "",
    //     },
    // });
    // function onSubmit(values: z.infer<typeof ReviewValidation>) {
    //     console.log(values);
    // }

    const rating = product?.starRating;

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

                    <p>
                        {rating} <span>{renderStars(product?.starRating)}</span>
                    </p>
                </div>
                <div className="pl-10 flex flex-col p-5 gap-4 w-full md:w-1/2">
                    <div className="flex">
                        <h1 className="text-3xl font-bold pt-5">title</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="pl-5 pt-5">
                                <Button className="cursor-pointer ">
                                    Available Tiers
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                {product?.tiers.map((tier, index) => (
                                    <DropdownMenuItem key={index}>
                                        {tier.name}
                                    </DropdownMenuItem>
                                ))}
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <p>Tag: {product?.tag}</p>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        {product?.productText}
                    </ScrollArea>

                    <Button
                        className="cursor-pointer mt-auto mb-10 flex"
                        onClick={sendServiceInquiry}
                    >
                        Send Service Inquiry{" "}
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
            <Reviews reviews={product?.reviews} />
        </div>
    );
};

export default ProductView;
