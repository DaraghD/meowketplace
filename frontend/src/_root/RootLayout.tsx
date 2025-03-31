import {
    Menubar,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarSeparator,
    MenubarTrigger,
} from "@/components/ui/menubar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Outlet, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/context.tsx";

const RootLayout = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user } = context;

    const navigate = useNavigate();

    const handleLogoClick = () => {
        navigate("/");
    };

    return (
        <>
            <div className="hidden xl:block">
                <div className="max-w-screen h-1/10 flex items-center justify-between pl-1">
                    <div className="flex items-center">
                        <img
                            src="/assets/icons/logo.png"
                            className="pl-1 h-14 w-auto mr-2 cursor-pointer"
                            onClick={handleLogoClick}
                        />
                        <h1 className="cursor-pointer" onClick={handleLogoClick}>Meowketplace</h1>
                    </div>

                    <div className="flex space-x-4 mr-5 items-center">
                        <button
                            onClick={() => navigate("/search")}
                            className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                        >
                            Search
                        </button>
                        <button
                            onClick={() => navigate("/services")}
                            className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                        >
                            Services
                        </button>
                        <button
                            onClick={() => navigate("/messages")}
                            className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                        >
                            Messages
                        </button>
                        <button
                            onClick={() => navigate("/about-us")}
                            className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
                        >
                            About us
                        </button>
                        <button className="cursor-pointer" onClick={() => navigate("/profile")}>
                            <Avatar onClick={() => navigate("/profile")}>
                                <AvatarImage
                                    src={`http://localhost:8080/api/user/picture/${user?.id}`}
                                />
                                <AvatarFallback>Login</AvatarFallback>
                            </Avatar>
                        </button>
                    </div>
                </div>
            </div>

            <div className="block xl:hidden max-w-screen">
                <Menubar className="h-16">
                    <MenubarMenu>
                        <MenubarTrigger
                            className="flex items-center space-x-2 h-full cursor-pointer"
                            style={{ backgroundColor: "transparent" }}
                        >
                            <img
                                src="/assets/icons/hamburger.png"
                                className="w-auto h-10"
                            />
                            <span className="text-lg font-bold">
                                Meowketplace
                            </span>
                        </MenubarTrigger>
                        <MenubarContent>
                            <MenubarItem className="cursor-pointer"
                                onClick={() => navigate("/services")}>
                                Services
                            </MenubarItem>
                            {user?.is_business ?
                                <MenubarItem
                                    className="cursor-pointer"
                                    onClick={() => navigate("/product-listing")}>
                                    Add listing
                                </MenubarItem>
                                : <></>}
                            <MenubarSeparator />
                            <MenubarItem
                                className="cursor-pointer"
                                onClick={() => navigate("/messages")}
                            >
                                Messages
                            </MenubarItem>
                            <MenubarSeparator />
                            <MenubarItem className="cursor-pointer">
                                <span>Profile</span>{" "}
                                <Avatar>
                                    <AvatarImage
                                        src={`http://localhost:8080/api/user/picture/${user?.id}`}
                                    />
                                    <AvatarFallback>CN</AvatarFallback>
                                </Avatar>
                            </MenubarItem>
                        </MenubarContent>
                        <img
                            src="/assets/icons/logo.png"
                            className="w-auto h-14 ml-auto pr-3"
                        />
                    </MenubarMenu>
                </Menubar>
            </div>

            <section>
                <Outlet />
            </section>

            <footer className="bg-200 p-6 border-t border-gray">

                <ul className="flex">
                    <li className="m-6 w-1/5 t-1/2">
                        <img 
                        className="w-44 h-auto"
                            src="/assets/icons/logo.png"
                        />
                    </li>
                    <li className="text-xs inline w-1/5 m-6">
                        <h2 className="text-lg mb-4">About Us</h2>
                        <span className="text-sm">All-in-one pet services with a personal touch. Whether it's grooming, sitting, or walking, we have everything your pet needs.
                            Expert care that understands the bond you share with your furry friend!.</span>
                    </li>
                    <li className="text-xs inline w-1/5 m-6">
                        <h2 className="text-lg mb-4">Contact Us</h2>
                        <ul>
                        <li className="text-sm mb-2">Address: Castletroy, Co. Limerick, V94 T9PX</li>
                        <li className="text-sm mb-2">Email: contact@meowketplace.ie</li>
                        <li className="text-sm mb-2">Phone: +353 061 202700</li>
                        </ul>
                    </li>
                    <li className="text-xs inline w-1/5 m-6">
                        <h2 className="text-lg mb-4" >Services</h2>
                        <ul>
                        <li className="text-sm mb-2">Pet Grooming</li>
                        <li className="text-sm mb-2">Pet Sitting</li>
                        <li className="text-sm mb-2">Dog Walking</li>
                        <li className="text-sm mb-2">Pet Training</li>
                        </ul>
                    </li>
                    <li className="text-xs w-1/5 m-6">
                        <h2 className="text-lg mb-4">Links</h2>
                        <div className="flex flex-col">
                        <a className="text-sm mb-2" href="/home">Home</a>
                        <a className="text-sm mb-2" href="/search">Search</a>
                        <a className="text-sm mb-2" href="/services">Services</a>
                        <a className="text-sm mb-2" href="/about-us">About Us</a>
                        </div>
                    </li>
                </ul>
            </footer>
        </>

    );
};

export default RootLayout;
