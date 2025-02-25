import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { getImageOrientation } from "~/utils/get-image-orientation";
import { z } from "zod";
import { generateFileNameFromUrl } from "~/utils/generate-file-name-from-url";
import { fetchImageArrayBuffer } from "~/utils/fetch-image-array-buffer";
import { generateImagePrompt } from "./generate-image-prompt";
import { generateImageFromPrompt } from "./generate-image-from-prompt";
import { uploadImageToBlobStorage } from "./upload-image-to-blob-storage";

export const imageRouter = createTRPCRouter({
  gen: publicProcedure.query(async ({ ctx }) => {
    const defaultAzureCredential = new DefaultAzureCredential();

    const scope: string | string[] = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(defaultAzureCredential, scope);

    const { prompt, keywords, size } = await generateImagePrompt(azureADTokenProvider);
    const { url, width, height } = await generateImageFromPrompt(azureADTokenProvider, prompt, size);
    const orientation = getImageOrientation(width, height);

    const imageArrayBuffer = await fetchImageArrayBuffer(url);
    const fileName = generateFileNameFromUrl(url);
    const downloadUrl = await uploadImageToBlobStorage(defaultAzureCredential, fileName, imageArrayBuffer);

    return ctx.db.image.create({
      data: {
        prompt,
        keywords,
        url,
        downloadUrl,
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
