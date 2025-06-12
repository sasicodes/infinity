import "dotenv/config";

import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { sessionInjector } from "./middlewares";
import { generate } from "./services/generate";
import { publish } from "./services/publish";
import { upload } from "./services/upload";

const app = new Hono();

app.use("*", cors()).use(sessionInjector);

app.post("/upload", upload);
app.post("/generate", generate);
app.post(
  "/publish",
  zValidator(
    "json",
    z.object({
      ipId: z.string(),
      content: z.string().optional(),
      html: z.string().optional(),
      mediaUrl: z.string().optional()
    })
  ),
  publish
);

serve(
  {
    fetch: app.fetch,
    port: 3000
  },
  (info) => {
    console.info(`Server is running on http://localhost:${info.port}`);
  }
);
