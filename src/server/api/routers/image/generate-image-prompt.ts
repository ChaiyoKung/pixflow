import { TRPCError } from "@trpc/server";
import { type AzureOpenAI } from "openai";
import { zodResponseFormat } from "openai/helpers/zod.mjs";
import { modelInstrcutionsAndContext } from "./model-instructions-and-context";
import { chatCompletionSchema } from "./schema";

export async function generateImagePrompt(client: AzureOpenAI) {
  console.log("Generating image prompt...");

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
