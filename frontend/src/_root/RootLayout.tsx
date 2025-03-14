const RootLayout = () => {
  return (
    <>
      <div className="hidden xl:block">
        <div className="w-screen h-1/10 flex items-center justify-between pl-1 bg-blue-500">
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
    </>
  );
};

export default RootLayout;
