import { z } from "zod";

export const responseSchema = z.object({
  prompt: z.string(),
  keywords: z.array(z.string()),
});

export const textToImageResponseSchema = z.object({
  url: z.string().url(),
});

export const sizeTupleSchema = z.tuple([z.number(), z.number()]);
