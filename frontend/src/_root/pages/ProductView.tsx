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
import { User, Product } from "@/lib/types/types";

const ProductView = () => {
    const rating = 4.1; //placeholder

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
    ]; //placeholder

    const exampleProduct: Product = {
        id: 1,
        user: {
            id: 1,
            username: "oscar",
            is_verified: true,
        },
        productText:
            "This is a premium digital marketing course with comprehensive modules covering SEO, social media, and content marketing.",
        price: 99.99, // base price
        starRating: 4.7,
        createdAt: new Date("2023-05-15T10:00:00Z"),
        reviews: [
            {
                id: 101,
                user: {
                    id: 2,
                    username: "john",
                    is_verified: false,
                },
                product: {} as Product, // This would circular reference the parent product
                reviewText: "Great course! Learned a lot about SEO techniques.",
                starRating: 5,
                createdAt: new Date("2023-06-01T14:30:00Z"),
            },
            {
                id: 102,
                user: {
                    id: 3,
                    username: "sarah",
                    is_verified: true,
                },
                product: {} as Product,
                reviewText:
                    "Good content but could use more practical examples.",
                starRating: 4,
                createdAt: new Date("2023-06-10T09:15:00Z"),
            },
        ],
        tiers: [
            {
                id: 1001,
                product: {} as Product,
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
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Tempora impedit labore quas quis. Rem culpa nisi in!
                        Tempora molestiae harum corporis nostrum facilis,
                        veritatis fugit natus esse recusandae sapiente saepe
                        sunt quidem, aspernatur vero deserunt necessitatibus sed
                        exercitationem dolor ab voluptate pariatur optio?
                        Similique et ratione accusamus non temporibus ut
                        possimus autem quasi explicabo quas quod perferendis
                        aliquid, mollitia, deserunt doloremque quidem reiciendis
                        iusto at libero illo. Iusto cupiditate sapiente officiis
                        asperiores adipisci ad quas temporibus atque dignissimos
                        in? Ea a quidem possimus tempora rerum voluptates
                        doloribus iste eum voluptatum assumenda ducimus
                        veritatis ex, corporis labore odit distinctio
                        consequatur culpa hic illum deserunt iure in. Sint
                        dolore quae aliquam corrupti error vitae placeat! Quia
                        ducimus quidem itaque voluptatibus impedit amet nemo
                        nobis totam dicta aspernatur dolores quo, tempora ipsum
                        velit sint? Quo corporis fugiat rerum odit quibusdam
                        voluptates rem ratione, natus cumque numquam repellat
                        optio, voluptatem ab quidem impedit culpa earum ex cum
                        corrupti voluptatibus tempora porro delectus sint
                        exercitationem! Id ut nesciunt illo debitis neque totam
                        a omnis sapiente, quaerat nostrum ad, vel repellat.
                        Eligendi sunt numquam quos aspernatur facilis aliquid.
                        Saepe unde laboriosam architecto quam accusantium
                        laborum non consequatur, obcaecati illo debitis voluptas
                        maxime ut impedit doloribus officiis.
                    </ScrollArea>

                    <Button
                        className="hover:cursor-pointer mt-auto mb-10 flex"
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
                <p>Latest Reviews</p>
                <p>
                    ALEX: UTTER DOGSHIT SERVICE{" "}
                    <span>
                        <Button className="hover:cursor-pointer">
                            MESSAGE
                        </Button>
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

export default ProductView;
