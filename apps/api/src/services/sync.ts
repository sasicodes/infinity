import type { Context } from "hono";
import { prisma } from "../db";

export const syncFlow = async (c: Context) => {
  const { flow } = await c.req.json();

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const flowData = JSON.parse(flow);
  const { id } = flowData;

  try {
    await prisma.flow.upsert({
      where: {
        id
      },
      update: {
        id,
        flow: JSON.stringify(flow)
      },
      create: {
        id,
        flow: JSON.stringify(flow),
        userId: user.id
      }
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("🚀 ~ syncFlow ~ error:", error);
    return c.json({ success: false, error: "Failed to sync flow" }, 500);
  }
};

export const syncNodeContent = async (c: Context) => {
  const { node } = await c.req.json();

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const nodeData = JSON.parse(node);
  const { id } = nodeData;

  try {
    await prisma.node.upsert({
      where: {
        id
      },
      update: {
        id,
        node: JSON.stringify(node),
        userId: user.id
      },
      create: {
        id,
        node: JSON.stringify(node),
        userId: user.id
      }
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("🚀 ~ syncNodeContent ~ error:", error);
    return c.json(
      { success: false, error: "Failed to sync node content" },
      500
    );
  }
};

export const syncDeleteNodeContent = async (c: Context) => {
  const { id } = await c.req.json();

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    await prisma.node.delete({
      where: {
        id
      }
    });

    return c.json({ success: true });
  } catch (error) {
    console.error("🚀 ~ syncDeleteNodeContent ~ error:", error);
    return c.json(
      { success: false, error: "Failed to sync delete node content" },
      500
    );
  }
};
