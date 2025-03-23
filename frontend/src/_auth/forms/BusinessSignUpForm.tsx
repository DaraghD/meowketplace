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
import { Link } from "react-router-dom";
import { useState } from "react";

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

  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags = ["Grooming", "Walking", "Training"];

  const handleTagSelect = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
      form.setValue("services", [...selectedTags, tag].join(", "));
    }
  };

  const handleTagDelete = (tag: string) => {
    const updatedTags = selectedTags.filter((t) => t !== tag); // Remove the tag
    setSelectedTags(updatedTags);
    form.setValue("services", updatedTags.join(", "));
  };

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
            name="services"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  <DropdownMenu>
                    <DropdownMenuTrigger className="cursor-pointer">
                      Services ↓
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      {tags.map((tag) => (
                        <DropdownMenuItem
                          key={tag}
                          onClick={() => handleTagSelect(tag)}
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
                        // Prevent manual changes (optional, since `readOnly` is already set)
                        e.preventDefault();
                      }}
                    />
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedTags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-gray-200 px-2 py-1 rounded cursor-pointer"
                            onClick={() => handleTagDelete(tag)}
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
          <Button type="submit" className="cursor-pointer">
            Create an account
          </Button>
        </form>
      </div>
    </Form>
  );
};

export default BusinessSignUpForm;
