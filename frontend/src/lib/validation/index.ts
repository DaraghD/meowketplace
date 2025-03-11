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