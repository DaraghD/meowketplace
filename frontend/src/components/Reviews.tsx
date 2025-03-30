import { Review } from "@/lib/types/types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import { renderStars } from "@/lib/utils";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "./ui/drawer";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { z } from "zod";
import { ReviewValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface ReviewProps {
    reviews: Review[] | undefined;
    productID: number | undefined;
}

const Reviews: React.FC<ReviewProps> = ({ reviews, productID }) => {
    const form = useForm<z.infer<typeof ReviewValidation>>({
        resolver: zodResolver(ReviewValidation),
        defaultValues: {
            stars: 1,
            review_content: "",
        },
    });

    async function onSubmit(values: z.infer<typeof ReviewValidation>) {
        console.log("submit!");
        try {
            const payload = {
                ...values,
                product_id: productID,
                parent_review_id: null,
            };

            const response = await fetch("http://localhost:8080/api/review", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });
            if (response.status === 200) {
                console.log("success");
            }
        } catch (error) {
            console.log(error);
        }
        console.log("Data sent to backend");
    }

    const [, setVisibleReviews] = useState(2);
    // const [visibleReviews, setVisibleReviews] = useState(2); //TODO: use this later
    const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});

    const loadMoreReviews = () => {
        setVisibleReviews((prev) => prev + 3);
    };

    const loadLessReviews = () => {
        setVisibleReviews(2);
    };

    const toggleReplies = (reviewId: number) => {
        setShowReplies((prev) => ({
            ...prev,
            [reviewId]: !prev[reviewId],
        }));
    };

    if (reviews?.length === 0) {
        return (
            <div className="flex flex-col p-5">
                <div className="flex flex-col p-5">
                    No reviews for this product
                </div>
                <div className="flex p-5 justify-end">
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
                                                name="stars"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Star Rating
                                                        </FormLabel>
                                                        <FormControl>
                                                            <Input
                                                                {...field}
                                                                type="number"
                                                                onChange={(e) =>
                                                                    field.onChange(
                                                                        Number(
                                                                            e
                                                                                .target
                                                                                .value
                                                                        )
                                                                    )
                                                                }
                                                            />
                                                        </FormControl>
                                                        <FormMessage />
                                                    </FormItem>
                                                )}
                                            />
                                            <FormField
                                                control={form.control}
                                                name="review_content"
                                                render={({ field }) => (
                                                    <FormItem>
                                                        <FormLabel>
                                                            Review
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
        );
    }
    return (
        <div className="flex flex-col p-5">
            {" "}
            <p className="mb-3">Latest Reviews</p>{" "}
            {reviews?.map((review) => (
                <div key={review.id} className="border-b pb-4 mb-4">
                    {" "}
                    <div className="flex justify-between p-2">
                        {" "}
                        <div className="flex flex-col md:flex-row p-2 gap-2">
                            {" "}
                            <Avatar>
                                {" "}
                                <AvatarImage src="http://localhost:8080/api/user/picture/${review.user.id}" />{" "}
                                <AvatarFallback>
                                    {review.username}
                                </AvatarFallback>{" "}
                            </Avatar>{" "}
                            <p>{review.username}</p>{" "}
                            <p className="hidden xl:block">
                                {" "}
                                {renderStars(review.stars)}{" "}
                            </p>{" "}
                            <p>{review.stars}✨</p>{" "}
                        </div>{" "}
                        <div className="max-w-2/4">
                            {" "}
                            <p>{review.review_content}</p>{" "}
                        </div>{" "}
                        <div className="flex gap-1">
                            {" "}
                            <Button className="cursor-pointer">
                                {" "}
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
                    {/* replies */}
                    {review.replies.length > 0 && (
                        <div className="pl-14">
                            <Button
                                variant="ghost"
                                className="text-sm text-gray-500 hover:text-gray-700"
                                onClick={() => toggleReplies(review.id)}
                            >
                                {showReplies[review.id]
                                    ? "Hide replies"
                                    : `Show replies (${review.replies.length})`}
                            </Button>

                            {showReplies[review.id] && (
                                <div className="mt-2 space-y-3 pl-4 border-l-2 border-gray-200">
                                    {review.replies.map((reply) => (
                                        <div
                                            key={reply.id}
                                            className="flex items-start gap-2"
                                        >
                                            <Avatar className="h-6 w-6">
                                                <AvatarImage src="http://localhost:8080/api/user/picture/${reply.user.id}" />
                                                <AvatarFallback>
                                                    0
                                                </AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium text-sm">
                                                        {reply.username}
                                                    </span>
                                                </div>
                                                <p className="text-sm">
                                                    {reply.review_content}
                                                </p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            ))}
            <div className="flex p-5 justify-between">
                <div className="flex gap-2">
                    <Button
                        className="cursor-pointer"
                        onClick={loadLessReviews}
                    >
                        Load Less
                    </Button>
                    <Button
                        className="cursor-pointer"
                        onClick={loadMoreReviews}
                    >
                        Load More...
                    </Button>
                </div>
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
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-8 text-center"
                                    >
                                        <FormField
                                            control={form.control}
                                            name="stars"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Star Rating
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            {...field}
                                                            type="number"
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    Number(
                                                                        e.target
                                                                            .value
                                                                    )
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="review_content"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Review
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
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
    );
};

export default Reviews;
