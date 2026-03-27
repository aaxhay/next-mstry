import { z } from "zod";

export const messageSchema = z.object({
  content: z
    .string()
    .min(8, { message: "message should be at least of 8 characters" })
    .max(300, { message: "message should be at max of 300 characters" }),
});
