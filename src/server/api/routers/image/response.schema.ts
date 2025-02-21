import { z } from "zod";

export const responseSchema = z.object({
  prompt: z.string(),
  keywords: z.array(z.string()),
});
