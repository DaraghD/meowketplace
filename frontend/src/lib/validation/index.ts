import { z } from "zod";

export const SignUpValidation = z.object({
  username: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(4, { message: "Must be at least 4 characters" }),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(4, { message: "Must be at least 4 characters" })
});

export const BusinessSignUpValidation = z.object({
  username: z.string().min(1).max(50),
  email: z.string().email(),
  password: z.string().min(4, { message: "Must be at least 4 characters" }),
  description: z.string().min(1).max(2000),
  services: z.string().min(1).max(1000),
  is_business: z.boolean(),
  confirmPassword: z.string().min(1, { message: "Please confirm your password" })
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

const TierValidation = z.object({
  name: z.string().min(1, { message: "Title is required" }),
  price: z.coerce.number().min(0, { message: "Price must be a positive number" }),
  description: z.string().min(1).max(2000),
});

export const ProductListingValidation = z.object({
  name: z.string().min(1).max(2000),
  productText: z.string().min(1).max(2000),
  tag: z.string().min(1).max(2000),
  images: z
    .array(z.instanceof(File))
    .refine((files) => files.every((file) => file.size < 3000000), {
      message: "Each image must be less than 3MB.",
    }),
  tiers: z.array(TierValidation).min(1, { message: "At least one tier is required" }),
});

export const ReviewValidation = z.object({
  stars: z.coerce.number()
  .min(1, { message: "Rating must be at least 1" })
  .max(5, { message: "Rating must be at most 5" }),
  review_content: z.string().min(1).max(2000),
});
