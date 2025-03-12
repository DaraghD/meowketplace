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
import { Input } from "@/components/ui/input";
import { SignUpValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";

const SignUpForm = () => {
  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof SignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const response = await fetch("http://localhost:8080/api/user/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": '*',
        },
        body: JSON.stringify(values),
      });
      const data = await response.text();
      alert(data);
    } catch (error) {
      console.log(error);
    }
    console.log("Data sent to backend");
  }

  return (
    <Form {...form}>
      <img
        className="absolute top-0 right-0 m-4 w-16 h-16"
        src="/assets/icons/logo.png"
      />
      <div className="flex-center flex-col pl-10 pr-10 pb-10">
        <h1 className="text-3xl font-bold pt-5 sm:pt-12">
          Create an User Account
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
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
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
                <FormDescription>
                  Password must be at least 4 characters
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <p>
            By creating an account, you agree to our Terms of use and Privacy
            Policy
          </p>
          <Button type="submit">Create an account</Button>
          <p>
            Starting a business?{" "}
            <Link
              to="/business-sign-up"
              className="underline text-blue-600 hover:text-blue-800"
            >
              Click here
            </Link>
          </p>
        </form>
      </div>
    </Form>
  );
};

export default SignUpForm;
