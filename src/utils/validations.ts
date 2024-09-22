import { z } from "zod";

export const RegisterFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords must match",
  path: ["confirmPassword"],
});


export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password field is required",
  })
});

