import "dotenv/config";

import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { sessionInjector } from "./middlewares";
import { generate } from "./services/generate";
import { publish } from "./services/publish";
import {
  getFlowAndNodeContentFromDb,
  syncDeleteNodeContent,
  syncFlow,
  syncNodeContent
} from "./services/sync";
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
app.post(
  "/sync/flow",
  zValidator("json", z.object({ flow: z.string() })),
  syncFlow
);
app.post(
  "/sync/node",
  zValidator("json", z.object({ node: z.string(), flowId: z.string() })),
  syncNodeContent
);
app.delete(
  "/sync/node",
  zValidator("json", z.object({ id: z.string(), flowId: z.string() })),
  syncDeleteNodeContent
);
app.get(
  "/sync/all",
  zValidator("query", z.object({ flowId: z.string() })),
  getFlowAndNodeContentFromDb
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
