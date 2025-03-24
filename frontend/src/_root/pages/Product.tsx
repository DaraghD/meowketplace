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

const Product = () => {
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

                    <p>REVIEWS</p>
                </div>
                <div className="pl-10 flex flex-col w-1/2 p-5 gap-4">
                    <h1 className="text-3xl font-bold pt-5">title</h1>
                    <p>tags</p>
                    <p>DESCRIPTION</p>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="cursor-pointer">
                            Tiers
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            <DropdownMenuItem>Profile</DropdownMenuItem>
                            <DropdownMenuItem>Billing</DropdownMenuItem>
                            <DropdownMenuItem>Team</DropdownMenuItem>
                            <DropdownMenuItem>Subscription</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <button
                        className="hover:cursor-pointer mb-20"
                        onClick={() => toast("Service Inquiry sent!")}
                    >
                        MESSAGE
                    </button>
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
