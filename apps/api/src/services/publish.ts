import type { Context } from "hono";
import { prisma } from "../db";

export const publish = async (c: Context) => {
  const { html, mediaUrl, ipId, content } = await c.req.json();

  const post = await prisma.post.create({
    data: { html, mediaUrl, ipId, content, userId: "1" }
  });

  return c.json(post);
};
