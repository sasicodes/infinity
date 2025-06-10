import "dotenv/config";
import { serve } from "@hono/node-server";
import { streamText } from "ai";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { stream } from "hono/streaming";
import { codeModel } from "./model";
import { systemPrompt } from "./prompt";

const app = new Hono();

app.use("*", cors());

app.post("/generate", async (c) => {
  const { prompt } = await c.req.json();
  const result = streamText({
    model: codeModel,
    system: systemPrompt,
    prompt: prompt
  });

  c.header("X-Vercel-AI-Data-Stream", "v1");
  c.header("Content-Type", "text/plain; charset=utf-8");

  return stream(c, (stream) => stream.pipe(result.toDataStream()));
});

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
