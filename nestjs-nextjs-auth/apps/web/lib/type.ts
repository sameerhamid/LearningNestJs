import { z } from "zod";

export type FormState<T = unknown> =
  | {
      error?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      data?: T;
    }
  | undefined;

export const SignUpFormSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long." })
    .trim(),

  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .regex(/[a-zA-Z]/, {
      message: "Password must contain at least one letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    })
    .trim(),
});

export const LoginFormSchema = z.object({
  email: z
    .string()
    .email({ message: "Please enter a valid email address." })
    .trim(),

  password: z.string().min(1, { message: "Password must not be empty" }).trim(),
});
