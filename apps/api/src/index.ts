import "dotenv/config";

import { serve } from "@hono/node-server";
import { zValidator } from "@hono/zod-validator";
import { Hono } from "hono";
import { cors } from "hono/cors";
import { z } from "zod";
import { sessionInjector } from "./middlewares";
import { generate } from "./services/generate";
import { createPost, getAllPosts, getMyPosts } from "./services/post";
import {
  getFlowAndNodeContentFromDb,
  syncDeleteNodeContent,
  syncFlow,
  syncNodeContent
} from "./services/sync";
import { upload, uploadJson } from "./services/upload";

const app = new Hono();

app.use("*", cors()).use(sessionInjector);

app.post("/upload", upload);
app.post("/upload-json", uploadJson);
app.post("/generate", generate);
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

app.post(
  "/post/new",
  zValidator(
    "json",
    z.object({ ipId: z.string(), html: z.string(), nodeId: z.string() })
  ),
  createPost
);
app.get(
  "/posts",
  zValidator("query", z.object({ page: z.string(), pageSize: z.string() })),
  getAllPosts
);
app.get(
  "/posts/me",
  zValidator("query", z.object({ page: z.string(), pageSize: z.string() })),
  getMyPosts
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
