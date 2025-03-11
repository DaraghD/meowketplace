import { z } from "zod";

export const SignUpValidation = z.object({
    username: z.string().min(1).max(50),
    email: z.string().email(),
    password: z.string().min(4, {message: "Must be at least 4 characters"})
  });