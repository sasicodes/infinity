import { generateObject, streamText } from "ai";
import type { Context } from "hono";
import { stream } from "hono/streaming";
import { z } from "zod";
import { CATEGORIES } from "../constants";
import { categoryModel, codeModel } from "../model";
import { systemPrompt } from "../prompt";

export const generate = async (c: Context) => {
  const { prompt } = await c.req.json();
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const result = streamText({
    model: codeModel,
    system: systemPrompt,
    prompt: prompt
  });

  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) => stream.pipe(result.toDataStream()));
};

export const categorizePost = async (content: string) => {
  try {
    const { object } = await generateObject({
      model: categoryModel,
      system: systemPrompt,
      schema: z.object({
        category: z.enum(CATEGORIES)
      }),
      prompt: `
    This is a post content:
    ${content}

    Based on the post content, categorize the post. Fallback to "any" if you are not sure.
    `
    });

    return object.category ?? "any";
  } catch (error) {
    console.error("🚀 ~ categorizePost ~ error:", error);
    return "any";
  }
};
