
import { Review } from "@/lib/types/types";
import { AvatarImage, Avatar, AvatarFallback } from "@radix-ui/react-avatar";
import { Button } from "./ui/button";
import { useState } from "react";
import { renderStars } from "@/lib/utils";

interface ReviewProps {
    reviews: Review[] | undefined;
}

const Reviews: React.FC<ReviewProps> = ({ reviews }) => {

    const [visibleReviews, setVisibleReviews] = useState(2);
    const [showReplies, setShowReplies] = useState<Record<number, boolean>>({});
    // const displayedReviews = reviews.slice(0, visibleReviews);

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
        return <div className="flex flex-col p-5"> No reviews for this product</div>;
    }

    return (
        < div className="flex flex-col p-5" > <p className="mb-3">Latest Reviews</p> {
            reviews?.map((review) => (<div key={review.id} className="border-b pb-4 mb-4"> <div className="flex justify-between p-2"> <div className="flex flex-col md:flex-row p-2 gap-2"> <Avatar> <AvatarImage src="https://github.com/shadcn.png" /> <AvatarFallback>CN</AvatarFallback> </Avatar> <p>{review.user.username}</p> <p className="hidden xl:block"> {renderStars(review.starRating)}{" "} </p> <p>{review.starRating}✨</p> </div> <div className="max-w-2/4"> <p>{review.reviewText}</p> </div> <div className="flex gap-1"> <Button className="cursor-pointer"> <img src="/assets/icons/ReplyIcon.png" className="w-7 h-auto" />
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
                                            <AvatarImage src="https://github.com/shadcn.png" />
                                            <AvatarFallback>
                                                CN
                                            </AvatarFallback>
                                        </Avatar>
                                        <div>
                                            <div className="flex items-center gap-1">
                                                <span className="font-medium text-sm">
                                                    {
                                                        reply.user
                                                            .username
                                                    }
                                                </span>
                                            </div>
                                            <p className="text-sm">
                                                {reply.replyText}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
            ))
        }

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
        </div >
    )
}






export default Reviews
