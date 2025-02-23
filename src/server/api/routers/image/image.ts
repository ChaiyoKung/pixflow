import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { type AzureClientOptions, AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { modelInstrcutionsAndContext } from "./model-instructions-and-context";
import { chatCompletionSchema, sizeTupleSchema, textToImageResponseSchema } from "./schema";
import { TRPCError } from "@trpc/server";
import { env } from "~/env";
import { type ImageGenerateParams } from "openai/resources/images.mjs";
import { getImageOrientation } from "~/utils/get-image-orientation";
import { z } from "zod";

export const imageRouter = createTRPCRouter({
  gen: publicProcedure.query(async ({ ctx }) => {
    const scope: string | string[] = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

    const { prompt, keywords, size } = await generateImagePrompt(azureADTokenProvider);
    const { url, width, height } = await generateImageFromPrompt(azureADTokenProvider, prompt, size);
    const orientation = getImageOrientation(width, height);

    return ctx.db.image.create({
      data: {
        prompt,
        keywords,
        url,
        downloadUrl: url,
        width,
        height,
        orientation,
      },
    });
  }),

  list: publicProcedure
    .input(
      z.object({
        page: z.number().min(1).default(1),
        pageSize: z.number().min(1).max(100).default(10),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize } = input;

      const images = await ctx.db.image.findMany({
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await ctx.db.image.count();
      const totalPages = Math.ceil(total / pageSize);

      return {
        images,
        total,
        page,
        pageSize,
        totalPages,
      };
    }),
});

async function generateImageFromPrompt(
  azureADTokenProvider: AzureClientOptions["azureADTokenProvider"],
  prompt: string,
  size: NonNullable<ImageGenerateParams["size"]> = "1024x1024"
) {
  console.log(`Starting image generation with prompt: "${prompt}" and size: "${size}"...`);

  const client = new AzureOpenAI({
    azureADTokenProvider,
    deployment: env.AZURE_OPENAI_TEXT_TO_IMAGE_DEPLOYMENT,
    apiVersion: env.AZURE_OPENAI_TEXT_TO_IMAGE_VERSION,
  });

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

async function generateImagePrompt(azureADTokenProvider: AzureClientOptions["azureADTokenProvider"]) {
  console.log("Generating image prompt...");

  const client = new AzureOpenAI({
    azureADTokenProvider,
    deployment: env.AZURE_OPENAI_CHAT_COMPLETION_DEPLOYMENT,
    apiVersion: env.AZURE_OPENAI_CHAT_COMPLETION_VERSION,
  });

  const prompt = "Write text-to-image prompt";
  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: modelInstrcutionsAndContext },
      { role: "user", content: prompt },
    ],

    // https://platform.openai.com/docs/guides/structured-outputs
    response_format: zodResponseFormat(chatCompletionSchema, "chatCompletionSchema"),
  });

  if (!response.choices[0]?.message.content) {
    throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "No content in response" });
  }

  const resultJson = JSON.parse(response.choices[0].message.content) as unknown;
  const result = chatCompletionSchema.parse(resultJson);
  return result;
}
