import { TRPCError } from "@trpc/server";
import { type AzureOpenAI } from "openai";
import { type ImageGenerateParams } from "openai/resources/images.mjs";
import { textToImageResponseSchema, sizeTupleSchema } from "./schema";

export async function generateImageFromPrompt(
  client: AzureOpenAI,
  prompt: string,
  size: NonNullable<ImageGenerateParams["size"]> = "1024x1024"
) {
  console.log(`Starting image generation with prompt: "${prompt}" and size: "${size}"...`);

  /**
   * The number of images to generate.
   * Currently, only 1 image is supported.
   */
  const n: ImageGenerateParams["n"] = 1;
  const response = await client.images.generate({ prompt, model: "dall-e-3", n, size });
  if (response.data.length === 0) {
    throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "No content in response" });
  }

  const { url } = textToImageResponseSchema.parse(response.data[0]);
  const [width, height] = sizeTupleSchema.parse(size.split("x").map(Number));
  return { url, width, height };
}
