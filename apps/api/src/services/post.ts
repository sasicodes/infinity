import type { Context } from "hono";
import { prisma } from "../db";

export const createPost = async (c: Context) => {
  const { html, ipId, nodeId } = await c.req.json();

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    await prisma.post.create({
      data: { html, ipId, nodeId, userId: user.id, username: user.username }
    });
    return c.json({ success: true });
  } catch (error) {
    console.error("🚀 ~ createPost ~ error:", error);
    return c.json({ success: false }, 500);
  }
};

export const getAllPosts = async (c: Context) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const page = Number(c.req.query("page") ?? "1");
  const pageSize = Number(c.req.query("pageSize") ?? "10");
  const skip = (page - 1) * pageSize;

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }
    }),
    prisma.post.count({})
  ]);

  return c.json({
    posts,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    },
    success: true
  });
};

export const getMyPosts = async (c: Context) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const page = Number(c.req.query("page") ?? "1");
  const pageSize = Number(c.req.query("pageSize") ?? "10");
  const skip = (page - 1) * pageSize;

  const [posts, total] = await prisma.$transaction([
    prisma.post.findMany({
      where: { userId: user.id },
      skip,
      take: pageSize,
      orderBy: { createdAt: "desc" }
    }),
    prisma.post.count({
      where: { userId: user.id }
    })
  ]);

  return c.json({
    posts,
    pagination: {
      page,
      pageSize,
      total,
      totalPages: Math.ceil(total / pageSize)
    },
    success: true
  });
};
