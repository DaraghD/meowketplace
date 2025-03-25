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
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";
import Autoplay from "embla-carousel-autoplay";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { User, Product, Review } from "@/lib/types/types";
import { ReviewValidation } from "@/lib/validation";
import { useState } from "react";

const ProductView = () => {
    const form = useForm<z.infer<typeof ReviewValidation>>({
        resolver: zodResolver(ReviewValidation),
        defaultValues: {
            rating: 0,
            text: "",
        },
    });
    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof ReviewValidation>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values);
    }

    const rating = 4.1; //placeholder

    // Users data (expanded from your example)
    const users: User[] = [
        {
            id: 1,
            username: "oscar",
            is_verified: true,
        },
        {
            id: 2,
            username: "john",
            is_verified: false,
        },
        {
            id: 3,
            username: "sarah",
            is_verified: true,
        },
    ];

    // Reviews data
    const productReviews: Review[] = [
        {
            id: 101,
            user: users[1], // john
            product: {} as Product, // Will reference the product below
            reviewText: "Great course! Learned a lot about SEO techniques.",
            starRating: 5,
            createdAt: new Date("2023-06-01T14:30:00Z"),
        },
        {
            id: 102,
            user: users[2], // sarah
            product: {} as Product,
            reviewText: "Good content but could use more practical examples.",
            starRating: 4,
            createdAt: new Date("2023-06-10T09:15:00Z"),
        },
        {
            id: 103,
            user: users[1], // john
            product: {} as Product, // Will reference the product below
            reviewText: "nvm its shit",
            starRating: 1,
            createdAt: new Date("2023-06-01T14:30:00Z"),
        },
        {
            id: 104,
            user: users[2], // sarah
            product: {} as Product,
            reviewText: "Loving it!",
            starRating: 5,
            createdAt: new Date("2023-06-10T09:15:00Z"),
        },
    ];

    // Product data
    const exampleProduct: Product = {
        id: 1,
        user: users[0], // oscar
        productText:
            "This is a premium digital marketing course with comprehensive modules covering SEO, social media, and content marketing.",
        price: 99.99, // base price
        starRating: 4.7,
        createdAt: new Date("2023-05-15T10:00:00Z"),
        reviews: productReviews,
        tiers: [
            {
                id: 1001,
                product: {} as Product, // Will reference this product
                price: 99.99,
                name: "Basic",
            },
            {
                id: 1002,
                product: {} as Product,
                price: 149.99,
                name: "Professional",
            },
            {
                id: 1003,
                product: {} as Product,
                price: 199.99,
                name: "Enterprise",
            },
        ],
    };

    // Fix circular references
    productReviews.forEach((review) => (review.product = exampleProduct));
    exampleProduct.tiers.forEach((tier) => (tier.product = exampleProduct));
    // Now all circular references are properly set

    const [visibleReviews, setVisibleReviews] = useState(3);
    const displayedReviews = productReviews.slice(0, visibleReviews);

    const loadMoreReviews = () => {
        setVisibleReviews((prev) => prev + 3);
    };

    const renderStars = (rating: number) => {
        switch (Math.floor(rating)) {
            case 1:
                return "⭐☆☆☆☆";
            case 2:
                return "⭐⭐☆☆☆";
            case 3:
                return "⭐⭐⭐☆☆";
            case 4:
                return "⭐⭐⭐⭐☆";
            case 5:
                return "🌟🌟🌟🌟🌟";
            default:
                return "No rating";
        }
    };

    return (
        <div>
            <div className="flex h-1/4">
                <div className="flex flex-col w-1/2 max-h-1/3 p-5">
                    <Carousel
                        plugins={[
                            Autoplay({
                                delay: 5000,
                            }),
                        ]}
                        className="w-full"
                    >
                        <CarouselContent>
                            {[
                                "/assets/images/cat-brushing.jpg",
                                "/assets/images/CreateAccountImg.png",
                                "/assets/images/LoginAccountImg.png",
                            ].map((image, index) => (
                                <CarouselItem key={index}>
                                    <div className="aspect-square md:aspect-[4/3] w-full relative">
                                        <img
                                            src={image}
                                            alt={`Product image ${index + 1}`}
                                            className="w-full h-full object-contain rounded-lg"
                                        />
                                    </div>
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>

                    <p>
                        {rating} <span>{renderStars(rating)}</span>
                    </p>
                </div>
                <div className="pl-10 flex flex-col w-1/2 p-5 gap-4">
                    <div className="flex">
                        <h1 className="text-3xl font-bold pt-5">title</h1>
                        <DropdownMenu>
                            <DropdownMenuTrigger className="pl-5 pt-5">
                                <Button className="cursor-pointer ">
                                    Available Tiers
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuItem>Profile</DropdownMenuItem>
                                <DropdownMenuItem>Billing</DropdownMenuItem>
                                <DropdownMenuItem>Team</DropdownMenuItem>
                                <DropdownMenuItem>
                                    Subscription
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <p>tags</p>
                    <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                        {exampleProduct.productText}
                    </ScrollArea>

                    <Button
                        className="cursor-pointer mt-auto mb-10 flex"
                        onClick={() => toast("Service Inquiry sent!")} //add send message logic
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
            <div className="flex flex-col p-5">
                <p className="mb-3">Latest Reviews</p>
                {displayedReviews.map((review) => (
                    <div className="flex justify-between p-2" key={review.id}>
                        <div className="flex p-2 gap-2">
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback>CN</AvatarFallback>
                            </Avatar>

                            <p>{review.user.username}</p>
                            <p>{renderStars(review.starRating)} </p>
                        </div>
                        <p>{review.reviewText}</p>
                        <div className="flex gap-1">
                            <Button className="cursor-pointer">
                                <img
                                    src="/assets/icons/ReplyIcon.png"
                                    className="w-7 h-auto"
                                />
                            </Button>
                            <Button className="cursor-pointer">
                                <img
                                    src="/assets/icons/MessageIcon.png"
                                    className="w-7 h-auto "
                                />
                            </Button>
                        </div>
                    </div>
                ))}

                <div className="flex p-5 justify-between">
                    <Button
                        className="cursor-pointer"
                        onClick={loadMoreReviews}
                    >
                        Load More...
                    </Button>
                    <Drawer>
                        <DrawerTrigger>
                            <Button className="cursor-pointer">
                                Leave a Review
                            </Button>
                        </DrawerTrigger>
                        <DrawerContent>
                            <DrawerHeader>
                                <DrawerTitle>Leave a Review</DrawerTitle>
                                <DrawerDescription>
                                    <Form {...form}>
                                        <form
                                            onSubmit={form.handleSubmit(
                                                onSubmit
                                            )}
                                            className="space-y-8 text-center"
                                        >
                                            <FormField
                                                control={form.control}
                                                name="rating"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Star Rating
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="text"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Reasoning
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input {...field} />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <Button type="submit">
                                                Submit
                                            </Button>
                                        </form>
                                    </Form>
                                </DrawerDescription>
                            </DrawerHeader>
                            <DrawerFooter>
                                <DrawerClose>
                                    <Button
                                        variant="outline"
                                        className="cursor-pointer"
                                    >
                                        Cancel
                                    </Button>
                                </DrawerClose>
                            </DrawerFooter>
                        </DrawerContent>
                    </Drawer>
                </div>
            </div>
        </div>
    );
};

export default ProductView;
