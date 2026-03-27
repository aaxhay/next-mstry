import { z } from "zod";

export const acceptingMessageSchema = z.object({
  isAccpetingMessages: z.boolean(),
});
