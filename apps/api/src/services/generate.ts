import { streamText } from "ai";
import type { Context } from "hono";
import { stream } from "hono/streaming";
import { codeModel } from "../model";
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
