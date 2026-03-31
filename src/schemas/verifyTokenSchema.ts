import { z } from "zod";

export const verifyTokenSchema = z.object({
  verifyCode: z
    .string()
    .length(6, { message: "verify token should be of length 6" }),
});
