import { Button } from "@/components/ui/button";

const ProductListing = () => {
  return (
    <div>
      <div className="flex h-screen max-w-screen">
        <div className="flex flex-col w-1/2 p-5">
          <Button className="bg-white text-black">Add Image</Button>
          <p>REVIEWS</p>
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
