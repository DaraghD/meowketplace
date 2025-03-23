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
import {useEffect, useState} from "react";
import {userData} from "@/lib/types/types.ts";

const RootLayout = () => {
  const [user, setUser] = useState<userData| null>(null);

  useEffect(() => {
    const getUserData = async () => {
      const response = await fetch("http://localhost:8080/api/user/auth", {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const auth_data = await response.json();
      setUser(auth_data as userData);
    }
    getUserData();
    console.log(user);
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <div className="hidden xl:block">
        <div className="max-w-screen h-1/10 flex items-center justify-between pl-1">
          <div className="flex items-center">
            <img
              src="/assets/icons/logo.png"
              className="pl-1 h-14 w-auto mr-2 cursor-pointer"
            />
            <h1 className="cursor-pointer">Meowketplace</h1>
          </div>

          <div className="flex space-x-4 mr-5 items-center">
            <button className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer">
              Services
            </button>
            <button
              onClick={() => navigate("/messages")}
              className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer"
            >
              Messages
            </button>
            <button className="cursor-pointer">
              <Avatar onClick={() => navigate("/profile")}>
                <AvatarImage src={`https://localhost:8080/api/user/picture/${user?.id}`} />
                <AvatarFallback>CN</AvatarFallback>
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
              <img src="/assets/icons/hamburger.png" className="w-auto h-10" />
              <span className="text-lg font-bold">Meowketplace</span>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">Services</MenubarItem>
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
                  <AvatarImage src={`https://localhost:8080/api/user/picture/${user?.id}`} />
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
    </>
  );
};

export default RootLayout;
