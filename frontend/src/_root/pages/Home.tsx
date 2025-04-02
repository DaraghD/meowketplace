import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";
import { Context } from "@/context.tsx";
import SignUpButton from "@/components/SignUpButton";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user } = context;

    return (
        <div className="flex flex-col items-center min-h-screen">
            <div className="flex flex-col items-center justify-center relative">
                <div className="max-w-[90%] relative">
                    <img
                        src="/assets/images/cats.png"
                        className="w-full h-auto rounded-lg "
                    />

                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center w-[80%] max-w-2xl">
                        <p className="sm:text-3xl text-1x1 font-bold mb-4">
                            Welcome to Meowketplace
                        </p>
                        <p className="text-xl mb-4 hidden sm:block">
                            Purr, Wag, Repeat - Find Pet Services with Ease
                        </p>
                        {!user ? (
                            <>
                                <p className="text-lg mb-6 hidden sm:block">
                                    Join us today!
                                </p>
                                <Link to="/sign-up">
                                    <SignUpButton />
                                </Link>
                            </>
                        ) : (
                            <p className="text-xl">Welcome {user.username}!</p>
                        )}
                    </div>
                </div>
            </div>

            <div className="section3">
                <div className="text2">
                    <h2>Where Pet Lovers can Find Trusted Services!</h2>
                    <p>
                        Here at Meowketplace you can sit back stress free
                        knowing that you are getting the best services for your
                        loved ones from business' advocated for by the
                        community!
                    </p>
                </div>
                <img
                    src="/assets/images/cat-brushing.jpg"
                    alt="Cat Brushing"
                    className="rounded-lg"
                />
            </div>
            <div className="section2 sm:!flex">
                <img
                    src="/assets/images/cat-working.jpg"
                    alt="Cat Brushing"
                    className="
                    !hidden md:!block"
                />
                <div className="text2">
                    <h2>A Place where Business' can Thrive!</h2>
                    <p>
                        As a Meowketplace business, you get premium tools to
                        advertise your services—featured listings, targeted
                        promotions, and seamless client connections. Stand out,
                        attract more cats (and their humans), and grow
                        meow-tastically!
                    </p>
                </div>
                <img
                    src="/assets/images/cat-working.jpg"
                    alt="Cat Brushing"
                    className="block sm:!hidden"
                />
            </div>
            <div className="section3">
                <div className="text2">
                    <h2>How it Works</h2>
                    <p>
                        As a business on Meowketplace you'll be given ratings
                        from verified customers based on the quality of your
                        service. This way customers are able to gain trust from
                        business'.
                    </p>
                </div>
                <img src="/assets/images/dog-lol.jpg" alt="Cat Brushing" />
            </div>
            <div className="section4">
                <h2>Want the Best Meowketplace Experience?</h2>
                <p>Get Meowketplace!</p>
            </div>
        </div>
    );
};

export default Home;
