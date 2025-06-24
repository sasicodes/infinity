import { createOpenRouter } from "@openrouter/ai-sdk-provider";

const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY
});

export const codeModel = openrouter("mistralai/devstral-small:free");
export const categoryModel = openrouter(
  "mistralai/mistral-small-3.2-24b-instruct:free"
);
