import { createTRPCRouter, privateProcedure, publicProcedure } from "~/server/api/trpc";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { getImageOrientation } from "~/utils/get-image-orientation";
import { z } from "zod";
import { generateFileNameFromUrl } from "~/utils/generate-file-name-from-url";
import { fetchImageArrayBuffer } from "~/utils/fetch-image-array-buffer";
import { generateImagePrompt } from "./generate-image-prompt";
import { generateImageFromPrompt } from "./generate-image-from-prompt";
import { uploadImageToBlobStorage } from "./upload-image-to-blob-storage";
import { AzureOpenAI } from "openai";
import { env } from "~/env";
import { BlobServiceClient } from "@azure/storage-blob";
import { TRPCError } from "@trpc/server";
import { type Prisma } from "@prisma/client";

export const imageRouter = createTRPCRouter({
  gen: privateProcedure.mutation(async ({ ctx }) => {
    const defaultAzureCredential = new DefaultAzureCredential();

    const scope: string | string[] = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(defaultAzureCredential, scope);

    const chatCompletionClient = new AzureOpenAI({
      azureADTokenProvider,
      deployment: env.AZURE_OPENAI_CHAT_COMPLETION_DEPLOYMENT,
      apiVersion: env.AZURE_OPENAI_CHAT_COMPLETION_VERSION,
    });

    const textToImageClient = new AzureOpenAI({
      azureADTokenProvider,
      deployment: env.AZURE_OPENAI_TEXT_TO_IMAGE_DEPLOYMENT,
      apiVersion: env.AZURE_OPENAI_TEXT_TO_IMAGE_VERSION,
    });

    const azureBlobStorageUri = `https://${env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`;
    const blobServiceClient = new BlobServiceClient(azureBlobStorageUri, defaultAzureCredential);

    const { prompt, keywords, size } = await generateImagePrompt(chatCompletionClient);
    const { url, width, height } = await generateImageFromPrompt(textToImageClient, prompt, size);
    const orientation = getImageOrientation(width, height);

    const imageArrayBuffer = await fetchImageArrayBuffer(url);
    const fileName = generateFileNameFromUrl(url);
    const containerName = env.AZURE_STORAGE_ACCOUNT_IMAGES_CONTAINER_NAME;
    const downloadUrl = await uploadImageToBlobStorage(blobServiceClient, containerName, fileName, imageArrayBuffer);

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
        keywords: z.array(z.string()).default([]),
        orientation: z.enum(["horizontal", "vertical", "square"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { page, pageSize, keywords, orientation } = input;

      const where: Prisma.ImageWhereInput = {};
      if (keywords.length > 0) {
        where.keywords = {
          hasSome: keywords,
        };
      }
      if (orientation) {
        where.orientation = orientation;
      }

      const images = await ctx.db.image.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * pageSize,
        take: pageSize,
      });

      const total = await ctx.db.image.count({ where });
      const totalPages = Math.ceil(total / pageSize);

      return {
        images,
        total,
        page,
        pageSize,
        totalPages,
      };
    }),

  count: publicProcedure
    .input(
      z.object({
        keywords: z.array(z.string()).default([]),
        orientation: z.enum(["horizontal", "vertical", "square"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { keywords, orientation } = input;

      const where: Prisma.ImageWhereInput = {};
      if (keywords.length > 0) {
        where.keywords = {
          hasSome: keywords,
        };
      }
      if (orientation) {
        where.orientation = orientation;
      }

      return ctx.db.image.count({ where });
    }),

  infinity: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        limit: z.number().min(1).max(100).default(10),
        keywords: z.array(z.string()).default([]),
        orientation: z.enum(["horizontal", "vertical", "square"]).optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const { cursor, limit, keywords, orientation } = input;
      const page = cursor ?? 1;

      const where: Prisma.ImageWhereInput = {};
      if (keywords.length > 0) {
        where.keywords = {
          hasSome: keywords,
        };
      }
      if (orientation) {
        where.orientation = orientation;
      }

      const images = await ctx.db.image.findMany({
        where,
        orderBy: { createdAt: "desc" },
        skip: (page - 1) * limit,
        take: limit + 1,
      });

      let nextCursor: typeof cursor = undefined;
      if (images.length > limit) {
        images.pop();
        nextCursor = page + 1;
      }

      return {
        images,
        nextCursor,
      };
    }),

  get: publicProcedure.input(z.object({ id: z.string() })).query(async ({ ctx, input }) => {
    const { id } = input;
    const image = await ctx.db.image.findUnique({ where: { id } });
    if (!image) throw new TRPCError({ code: "NOT_FOUND", message: "Image not found" });
    return image;
  }),
});
