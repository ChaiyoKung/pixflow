import { z } from "zod";

export const chatCompletionSchema = z.object({
  prompt: z.string(),
  keywords: z.array(z.string()),
  size: z.enum(["1024x1024", "1792x1024", "1024x1792"]),
});

export const textToImageResponseSchema = z.object({
  url: z.string().url(),
});

export const sizeTupleSchema = z.tuple([z.number(), z.number()]);
