import React from "react";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  const location = useLocation(); // Get the current route

  const routeToImageMap: { [key: string]: string } = {
    "/sign-up": "/assets/images/CreateAccountImg.png",
    "/sign-in": "/assets/images/LoginAccountImg.png",
  };

  // Get the image for the current route
  const currentImage = routeToImageMap[location.pathname];

  return (
    <>
      {isAuthenticated ? (
        <Navigate to="/" />
      ) : (
        <>
          <img
            src={currentImage}
            className="hidden xl:block h-screen w-8/20 object-cover bg-no-repeat"
          />
          <section className="flex flex-1 justify-center items-center flex-col py-10">
            <Outlet />
          </section>
        </>
      )}
    </>
  );
};

export default AuthLayout;
