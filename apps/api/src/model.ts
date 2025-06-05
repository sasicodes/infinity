import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export const codeModel = openrouter("meta-llama/llama-4-maverick:free");
