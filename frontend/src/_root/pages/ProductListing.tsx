import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ProductListingValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ProductListing = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // State to store the image URL

  // 1. Define your form.
  const form = useForm<z.infer<typeof ProductListingValidation>>({
    resolver: zodResolver(ProductListingValidation),
    defaultValues: {
      productTitle: "",
      productText: "",
      price: 0,
      image: undefined,
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof ProductListingValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  // Handle file input change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Create a URL for the selected file
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl); // Update the state with the image URL
      form.setValue("image", file); // Update the form value
    }
  };

  // Handle div click to trigger file input
  const handleDivClick = () => {
    fileInputRef.current?.click(); // Trigger the file input click
  };

  return (
    <div className="flex h-screen max-w-screen p-5 overflow-hidden">
      <div
        className="flex flex-col h-4/5 w-1/2 justify-center items-center border border-dashed border-gray-400 cursor-pointer"
        onClick={handleDivClick} // Make the div clickable
      >
        {selectedImage ? ( // Conditionally render the image or the button
          <img
            src={selectedImage}
            alt="Selected"
            className="max-h-full max-w-full object-contain"
          />
        ) : (
          <Button
            className="bg-white text-black hover:bg-gray-200"
            type="button"
          >
            Add Image
          </Button>
        )}
      </div>

      <div className="flex flex-col w-1/2 p-5 space-y-3">
        <h2 className="text-xl font-bold">Add a Product to Sell!</h2>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="image"
              render={({ field: { value, onChange, ...fieldProps } }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      {...fieldProps}
                      ref={fileInputRef}
                      placeholder="Picture"
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange} // Use the custom handler
                      className="hidden"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productTitle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Title</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="productText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="hover:cursor-pointer" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ProductListing;
