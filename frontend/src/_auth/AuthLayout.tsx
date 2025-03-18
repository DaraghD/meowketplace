import { Outlet, Navigate, useLocation } from "react-router-dom";
import {useEffect, useState} from "react";

type User = {
  id: number;
  username: string;
  email: string;
  password: string;
  bio: string;
  is_business: boolean;
  is_verified: boolean;
  profile_picture: string;
  is_admin: boolean;
  is_banned: boolean;
  business_rating: number;
};

const AuthLayout= () => {
  const [isAuthenticated, setAuthentication] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const location = useLocation(); // Get the current route

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthentication(false);
        return;
      }
      const jwt = token.split(" ")[1];
      console.log(jwt);

      try {
        const auth_response = await fetch("http://127.0.0.1:8080/api/user/auth", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${jwt}`,
          },
        });

        const auth_data = await auth_response.json();

        if (auth_response.status !== 200) {
          setAuthentication(false);
          return;
        }
        setUser(auth_data as User);
        setAuthentication(true);

      } catch (error) {
        console.error("Error during authentication:", error);
        setAuthentication(false);
      }
    };

    checkAuth();
  }, []); // Empty dependency array ensures it only runs once on mount


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
              {alert(user.username? `Welcome back, ${user.username}` : "Welcome back!")}
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
};

export default AuthLayout;
