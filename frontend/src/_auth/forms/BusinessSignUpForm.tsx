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
import { BusinessSignUpValidation } from "@/lib/validation";
import { z } from "zod";
import { Link } from "react-router-dom";

const BusinessSignUpForm = () => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof BusinessSignUpValidation>>({
    resolver: zodResolver(BusinessSignUpValidation),
    defaultValues: {
      companyName: "",
      email: "",
      password: "",
      description: "",
      services: "",
    },
  });

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof BusinessSignUpValidation>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
    // TO DO: PASS DATA TO BACK END
  }

  return (
    <Form {...form}>
      <img
        className="absolute top-0 right-0 m-4 w-16 h-16"
        src="/assets/icons/logo.png"
      />
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
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company name</FormLabel>
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
                <FormLabel>Contact email</FormLabel>
                <FormControl>
                  <Input type="email" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input type="text" className="shad-input" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Services</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Seperate each service via comma e.g. (Grooming,Walking,Training)"
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
        </form>
      </div>
    </Form>
  );
};

export default BusinessSignUpForm;
