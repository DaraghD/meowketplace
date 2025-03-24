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

const Product = () => {
    const rating = 4.1;

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
                <div className="pl-10 flex flex-col p-5 gap-4">
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
                    <p>DESCRIPTION</p>
                    <Button
                        className="hover:cursor-pointer mb-20 flex"
                        onClick={() => toast("Service Inquiry sent!")}
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
                <p>LATEST REVIEWS</p>
                <p>
                    ALEX: UTTER DOGSHIT SERVICE{" "}
                    <span>
                        <button className="hover:cursor-pointer">
                            MESSAGE
                        </button>
                    </span>
                </p>
                <div className="flex p-5 justify-between">
                    <p>LOAD MORE...</p>
                    <p>LEAVE A REVIEW</p>
                </div>
            </div>
        </div>
    );
};

export default Product;
