import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { DefaultAzureCredential, getBearerTokenProvider } from "@azure/identity";
import { AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { modelInstrcutionsAndContext } from "./model-instructions-and-context";
import { responseSchema } from "./response.schema";
import { TRPCError } from "@trpc/server";
import { env } from "../../../../env";

export const imageRouter = createTRPCRouter({
  gen: publicProcedure.mutation(async () => {
    const scope: string | string[] = "https://cognitiveservices.azure.com/.default";
    const azureADTokenProvider = getBearerTokenProvider(new DefaultAzureCredential(), scope);

    const result = await generateImagePrompt(azureADTokenProvider);

    return { message: "success", data: result };
  }),
});

async function generateImagePrompt(azureADTokenProvider: AzureClientOptions["azureADTokenProvider"]) {
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
    response_format: zodResponseFormat(responseSchema, "responseSchema"),
  });

  if (!response.choices[0]?.message.content) {
    throw new TRPCError({ code: "UNPROCESSABLE_CONTENT", message: "No content in response" });
  }

  const resultJson = JSON.parse(response.choices[0].message.content) as unknown;
  const result = responseSchema.parse(resultJson);
  return result;
}
