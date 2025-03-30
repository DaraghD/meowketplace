import { useRef, useState, useEffect } from "react"; // Add useEffect
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { ProductListingValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { AddProduct } from "@/lib/types/types.ts";

const ProductListing = () => {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [selectedImages, setSelectedImages] = useState<string[]>([]); // State to store the image URLs
    const [userTags, setUserTags] = useState<string[]>([]); // State to store the user's tags

    useEffect(() => {
        const fetchUserTags = async () => {
            try {
                const response = await fetch(
                    "http://localhost:8080/api/user/auth",
                    {
                        method: "GET",
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                "token"
                            )}`,
                        },
                    }
                );

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const userData = await response.json();
                console.log(userData.business_tags);

                setUserTags(userData.business_tags.split(",") || []);
                // setUserTags(["tag1", "tag2", "tag3"]);
            } catch (error) {
                console.error("Error fetching user tags:", error);
            }
        };

        fetchUserTags();
    }, []);

    // 1. Define your form.
    const form = useForm<z.infer<typeof ProductListingValidation>>({
        resolver: zodResolver(ProductListingValidation),
        defaultValues: {
            name: "",
            productText: "",
            tag: "",
            images: [],
            tiers: [],
        },
    });

    const { fields, append } = useFieldArray({
        control: form.control,
        name: "tiers", // Name of the field array
    });

    async function onSubmit(values: z.infer<typeof ProductListingValidation>) {
        const formData = new FormData();

        const product: AddProduct = {
            name: values.name,
            productText: values.productText,
            tag: values.tag, // hello
            tiers: values.tiers,
        };
        formData.append("product", JSON.stringify(product));
        values.images.forEach((image) => {
            formData.append(`images`, image);
        });
        console.log(formData);
        const response = await fetch("http://localhost:8080/api/service", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: formData,
        });
        console.log(response);
    }

    // Handle file input change
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const imageUrls = Array.from(files).map((file) =>
                URL.createObjectURL(file)
            );
            setSelectedImages(imageUrls); // Update the state with the image URLs
            form.setValue("images", Array.from(files)); // Update the form value with the array of files
        }
    };

    // Handle div click to trigger file input
    const handleDivClick = () => {
        fileInputRef.current?.click(); // Trigger the file input click
    };

    // Handle "Add Tier" button click
    const handleAddTier = () => {
        append({ name: "", price: 0, description: "" }); // Append a new tier with default values
    };

    return (
        <div className="flex h-screen max-w-screen p-5">
            <div
                className="flex flex-col h-4/5 w-1/2 justify-center items-center border border-dashed border-gray-400 cursor-pointer"
                onClick={handleDivClick} // Make the div clickable
            >
                {selectedImages.length > 0 ? ( // Conditionally render the images or the button
                    <div className="flex flex-wrap gap-2">
                        {selectedImages.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Selected ${index}`}
                                className="max-h-32 max-w-32 object-contain"
                            />
                        ))}
                    </div>
                ) : (
                    <Button
                        className="bg-white text-black hover:bg-gray-200"
                        type="button"
                    >
                        Add Images
                    </Button>
                )}
            </div>

            <div className="flex flex-col w-1/2 p-5 space-y-3">
                <h2 className="text-xl font-bold">Add a Product to Sell!</h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-8"
                    >
                        <FormField
                            control={form.control}
                            name="images"
                            render={({
                                field: { value, onChange, ...fieldProps },
                            }) => (
                                <FormItem>
                                    <FormControl>
                                        <Input
                                            {...fieldProps}
                                            ref={fileInputRef}
                                            placeholder="Pictures"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange} // Use the custom handler
                                            className="hidden"
                                            multiple // Allow multiple files
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="name"
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
                            name="tag"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Tag</FormLabel>
                                    <FormControl>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger
                                                className="cursor-pointer"
                                                asChild
                                            >
                                                <Button variant="outline">
                                                    {field.value ||
                                                        "Select a tag"}
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>
                                                {userTags.map((tag) => (
                                                    <DropdownMenuItem
                                                        key={tag}
                                                        onSelect={() => {
                                                            field.onChange(tag);
                                                        }}
                                                    >
                                                        {tag}
                                                    </DropdownMenuItem>
                                                ))}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Render additional tier forms */}
                        {fields.map((field, index) => (
                            <div key={field.id} className="space-y-4">
                                <h3 className="text-lg font-semibold">
                                    Tier {index + 1}
                                </h3>
                                <FormField
                                    control={form.control}
                                    name={`tiers.${index}.name`} // Dynamic field name for title
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Tier Title</FormLabel>
                                            <FormControl>
                                                <Input {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`tiers.${index}.price`} // Dynamic field name for price
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Price</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="number"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name={`tiers.${index}.description`}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Description</FormLabel>
                                            <FormControl>
                                                <Input type="text" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                        ))}

                        <div className="flex flex-col m-5">
                            <Button
                                className="cursor-pointer mb-5"
                                type="button" // Prevent form submission
                                onClick={handleAddTier} // Add a new tier
                            >
                                Add Tier
                            </Button>
                            <Button className="cursor-pointer" type="submit">
                                Submit
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default ProductListing;
