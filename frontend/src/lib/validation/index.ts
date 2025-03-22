import { z } from "zod";

export const SignUpValidation = z.object({
    username: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(4, {message: "Must be at least 4 characters"})
  });

  export const SignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(4, {message: "Must be at least 4 characters"})
  });

  export const BusinessSignUpValidation = z.object({
    companyName: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(4, {message: "Must be at least 4 characters"}),
    description: z.string().min(1).max(2000),
    services: z.string().min(1).max(1000),
  });

const TierValidation = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
});

export const ProductListingValidation = z.object({
  name: z.string().min(1).max(2000),
  productText: z.string().min(1).max(2000),
  image: z
    .instanceof(File)
    .refine((file) => file.size < 7000000, {
      message: "Your image must be less than 7MB.",
    }),
  tiers: z.array(TierValidation).min(1, { message: "At least one tier is required" }),
});