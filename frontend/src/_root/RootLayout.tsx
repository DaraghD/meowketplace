import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Outlet } from "react-router-dom";

const RootLayout = () => {
  return (
    <>
      <div className="hidden xl:block">
        <div className="w-screen h-1/10 flex items-center justify-between pl-1">
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
            <button className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer">
              Messages
            </button>
            <button className="text-black hover:text-white hover:bg-black px-4 py-2 rounded transition-colors duration-200 cursor-pointer">
              Profile
            </button>
            <button className="cursor-pointer">
              <img
                src="/assets/icons/cartIcon.png"
                className="h-8 pl--4 w-auto"
                alt="Cart"
              />
            </button>
          </div>
        </div>
      </div>

      <div className="block xl:hidden w-screen">
        <Menubar className="h-16">
          <MenubarMenu>
            <MenubarTrigger className="flex items-center space-x-2 h-full cursor-pointer">
              <img src="/assets/icons/logo.png" className="w-auto h-14" />
              <span className="text-lg font-bold">Meowketplace</span>
            </MenubarTrigger>
            <MenubarContent>
              <MenubarItem className="cursor-pointer">Services</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer">Messages</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer">Profile</MenubarItem>
              <MenubarSeparator />
              <MenubarItem className="cursor-pointer">
                Cart{" "}
                <img className="w-auto h-5" src="/assets/icons/cartIcon.png" />
              </MenubarItem>
            </MenubarContent>
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
