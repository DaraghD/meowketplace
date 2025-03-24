import {Outlet, Navigate} from "react-router-dom";
import {useContext} from "react";
import {Context} from "@/context.tsx";

const AuthLayout = () => {
        const context = useContext(Context);
        if (!context) {
            throw new Error("Context not found");
        }

        const {user, isAuthenticated} = context;


        const routeToImageMap: { [key: string]: string } = {
            "/sign-up": "/assets/images/CreateAccountImg.png",
            "/sign-in": "/assets/images/LoginAccountImg.png",
            "/business-sign-up": "/assets/images/BusinessSignUpImg.png",
        };

        // Get the image for the current route
        const currentImage = routeToImageMap[location.pathname];

        return (
            <>
                {isAuthenticated && user ? (
                    <>
                        {alert(user.username ? `Welcome back, ${user.username}` : "Welcome back!")}
                        <Navigate to="/"/>
                    </>
                ) : (
                    <>
                        <img
                            src={currentImage}
                            className="hidden xl:block h-screen w-8/20 object-cover bg-no-repeat"
                        />
                        <section className="flex flex-1 justify-center items-center flex-col py-10">
                            <Outlet/>
                        </section>
                    </>
                )}
            </>
        );
    }
;

export default AuthLayout;
