import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
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
import { BusinessSignUpValidation } from "@/lib/validation";
import { z } from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff } from "lucide-react";

const BusinessSignUpForm = () => {
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const form = useForm<z.infer<typeof BusinessSignUpValidation>>({
        resolver: zodResolver(BusinessSignUpValidation),
        defaultValues: {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            description: "",
            services: "",
            is_business: true,
        },
    });

    const navigate = useNavigate();

    async function onSubmit(values: z.infer<typeof BusinessSignUpValidation>) {
        try {
            const { confirmPassword, ...userData } = values;

            const response = await fetch(
                "http://localhost:8080/api/user/signup",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(userData),
                }
            );

            const data = await response.text();
            if (response.ok) {
                toast(data);
                navigate("/sign-in");
            } else {
                toast.error(data);
            }
        } catch (error) {
            console.log(error);
            toast.error("An error occurred during sign up");
        }
    }

    const tags = [
        "Grooming",
        "Walking",
        "Training",
        "Pet Sitting",
        "Veterinary",
        "Pet Photography",
        "Pet Supplies",
        "Microchipping",
        "Pet Adoption",
    ];

    const handleTagSelect = (tag: string) => {
        if (!selectedTags.includes(tag)) {
            setSelectedTags([...selectedTags, tag]);
            form.setValue("services", [...selectedTags, tag].join(", "));
        }
    };

    const handleTagDelete = (tag: string) => {
        const updatedTags = selectedTags.filter((t) => t !== tag);
        setSelectedTags(updatedTags);
        form.setValue("services", updatedTags.join(", "));
    };

    return (
        <Form {...form}>
            <Link to="/">
                <img
                    className="absolute top-0 right-0 m-4 w-16 h-16"
                    src="/assets/icons/logo.png"
                    style={{ cursor: "pointer" }}
                    alt="Home"
                />
            </Link>
            <div className="flex-center flex-col pl-10 pr-10 pb-4">
                <h1 className="text-3xl font-bold pt-5 sm:pt-12">
                    Create Business account
                </h1>
                <p className="text-base text-gray-600">
                    Already have an Account?{" "}
                    <Link
                        to="/sign-in"
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        Log in
                    </Link>
                </p>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 w-full mt-4"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Company name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Contact email</FormLabel>
                                <FormControl>
                                    <Input
                                        type="email"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="services"
                        render={({}) => (
                            <FormItem>
                                <FormLabel>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="cursor-pointer">
                                            Services you will Provide ↓
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {tags.map((tag) => (
                                                <DropdownMenuItem
                                                    key={tag}
                                                    onClick={() =>
                                                        handleTagSelect(tag)
                                                    }
                                                >
                                                    {tag}
                                                </DropdownMenuItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Select via the Dropdown Menu"
                                            type="text"
                                            className="shad-input"
                                            readOnly
                                            value={selectedTags.join(", ")}
                                            onChange={(e) => {
                                                e.preventDefault();
                                            }}
                                        />
                                        {selectedTags.length > 0 && (
                                            <div className="flex flex-wrap gap-2 mt-2">
                                                {selectedTags.map((tag) => (
                                                    <span
                                                        key={tag}
                                                        className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                                                        onClick={() =>
                                                            handleTagDelete(tag)
                                                        }
                                                    >
                                                        {tag} ×
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="Password must be at least 4 characters long"
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="shad-input pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="confirmPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            className="shad-input pr-10"
                                            {...field}
                                        />
                                        <button
                                            type="button"
                                            className="absolute right-2 top-1/2 transform -translate-y-1/2"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p>
                        By creating an account, you agree to our Terms of use
                        and Privacy Policy
                    </p>
                    <Button type="submit" className="cursor-pointer">
                        Create an account
                    </Button>
                </form>
            </div>
        </Form>
    );
};

export default BusinessSignUpForm;
