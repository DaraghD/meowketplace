import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

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
import { SignInValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { Context } from "@/context.tsx";
import { userData } from "@/lib/types/types.ts";
import { toast } from "sonner";

const SignInForm = () => {
    const context = useContext(Context);
    if (!context) {
        throw new Error("Context not found");
    }
    const { user, setUser } = context;
    const form = useForm<z.infer<typeof SignInValidation>>({
        resolver: zodResolver(SignInValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(values: z.infer<typeof SignInValidation>) {
        const response = await fetch("http://localhost:8080/api/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });
        if (response.status === 200) {
            const data = await response.json();
            const token = data.token;
            const user_data = data.user;
            console.log(user_data);
            localStorage.setItem("token", token);
            setUser(user_data as userData);
            console.log("Trying to log user : ", user);
            toast("Sucessfully logged in");
            return (window.location.href = "/");
        }
    }

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
            <div className="flex-center flex-col pl-10 pr-10 pb-10">
                <h1 className="text-3xl font-bold pt-5 sm:pt-12">
                    Welcome Back!
                </h1>
                <p className="text-base text-gray-600">
                    Don't have an Account?{" "}
                    <Link
                        to="/sign-up"
                        className="underline text-blue-600 hover:text-blue-800"
                    >
                        Make one
                    </Link>
                </p>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex flex-col gap-3 w-full mt-4"
                >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
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
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="shad-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" className="cursor-pointer">
                        Log In
                    </Button>
                    <p>Purr, Wag, Repeat! - You're one click away!</p>
                </form>
            </div>
        </Form>
    );
};

export default SignInForm;
