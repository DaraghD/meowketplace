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

const SignInForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    const response = await fetch("http://meowketplace.ie:8080/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    });
    const data = await response.text();
    if (response.status === 200) {
      localStorage.setItem("token", data);
      alert(data);
      return (window.location.href = "/");
    }
  }

  return (
    <Form {...form}>
      <img
        className="absolute top-0 right-0 m-4 w-16 h-16"
        src="/assets/icons/logo.png"
      />
      <div className="flex-center flex-col pl-10 pr-10 pb-10">
        <h1 className="text-3xl font-bold pt-5 sm:pt-12">Welcome Back!</h1>
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
                  <Input type="email" className="shad-input" {...field} />
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
                  <Input type="password" className="shad-input" {...field} />
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
