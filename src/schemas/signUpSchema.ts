import { z } from "zod";

export const signUpSchema = z.object({
  username: z
    .string()
    .trim()
    .min(2, { message: "username should be minimum of 2 characters" })
    .max(10, { message: "username should be maximum of 10 characters" }),
  email: z
    .string()
    .email()
    .regex(/^.+@.+\..+$/, { message: "email should consist these" }),
  password: z
    .string()
    .min(6, { message: "password should be of minimum 6 characters" })
    .max(10, { message: "password should be of maximum 10 characters" }),
});
