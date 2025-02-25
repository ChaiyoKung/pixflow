import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  /**
   * Specify your server-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars.
   */
  server: {
    APP_API_KEY: z.string().min(16),
    DATABASE_URL: z.string().url(),
    AZURE_OPENAI_ENDPOINT: z.string().url(),
    AZURE_OPENAI_CHAT_COMPLETION_DEPLOYMENT: z.string(),
    AZURE_OPENAI_CHAT_COMPLETION_VERSION: z.string(),
    AZURE_OPENAI_TEXT_TO_IMAGE_DEPLOYMENT: z.string(),
    AZURE_OPENAI_TEXT_TO_IMAGE_VERSION: z.string(),
    AZURE_STORAGE_ACCOUNT_NAME: z.string(),
    AZURE_STORAGE_ACCOUNT_IMAGES_CONTAINER_NAME: z.string().default("images"),
    NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  },

  /**
   * Specify your client-side environment variables schema here. This way you can ensure the app
   * isn't built with invalid env vars. To expose them to the client, prefix them with
   * `NEXT_PUBLIC_`.
   */
  client: {
    // NEXT_PUBLIC_CLIENTVAR: z.string(),
  },

  /**
   * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
   * middlewares) or client-side so we need to destruct manually.
   */
  runtimeEnv: {
    APP_API_KEY: process.env.APP_API_KEY,
    DATABASE_URL: process.env.DATABASE_URL,
    AZURE_OPENAI_ENDPOINT: process.env.AZURE_OPENAI_ENDPOINT,
    AZURE_OPENAI_CHAT_COMPLETION_DEPLOYMENT: process.env.AZURE_OPENAI_CHAT_COMPLETION_DEPLOYMENT,
    AZURE_OPENAI_CHAT_COMPLETION_VERSION: process.env.AZURE_OPENAI_CHAT_COMPLETION_VERSION,
    AZURE_OPENAI_TEXT_TO_IMAGE_DEPLOYMENT: process.env.AZURE_OPENAI_TEXT_TO_IMAGE_DEPLOYMENT,
    AZURE_OPENAI_TEXT_TO_IMAGE_VERSION: process.env.AZURE_OPENAI_TEXT_TO_IMAGE_VERSION,
    AZURE_STORAGE_ACCOUNT_NAME: process.env.AZURE_STORAGE_ACCOUNT_NAME,
    AZURE_STORAGE_ACCOUNT_IMAGES_CONTAINER_NAME: process.env.AZURE_STORAGE_ACCOUNT_IMAGES_CONTAINER_NAME,
    NODE_ENV: process.env.NODE_ENV,
    // NEXT_PUBLIC_CLIENTVAR: process.env.NEXT_PUBLIC_CLIENTVAR,
  },
  /**
   * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
   * useful for Docker builds.
   */
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  /**
   * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
   * `SOME_VAR=''` will throw an error.
   */
  emptyStringAsUndefined: true,
});
