import { z } from "zod";

export const verifyTokenSchema = z.object({
  verifyToken: z
    .string()
    .length(6, { message: "verify token should be of length 6" }),
});
