import { z } from 'zod';

export const userCreationSchema = z.object({
  userName: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(30, { message: "Username must be at most 30 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email format" })
    .min(5, { message: "Email must be at least 5 characters long" })
    .max(100, { message: "Email must be at most 100 characters long" }),
}).strict();

export type UserCreation = z.infer<typeof userCreationSchema>;