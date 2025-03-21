import { Button } from "@/components/ui/button";

const ProductListing = () => {
  return (
    <div>
      <div className="flex h-screen max-w-screen">
        <div className="flex flex-col w-1/2 p-5 justify-center item-center">
          <Button className="h-full bg-white text-black hover:bg-amber-200 hover:cursor-pointer">
            Add Image
          </Button>
        </div>
        <div className="flex flex-col w-1/2 p-5">
          <p>TITLE</p>
          <p>DESCRIPTION</p>
          <button className="hover:cursor-pointer">MESSAGE</button>
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
