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
        flow
      },
      create: {
        id,
        flow,
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
  const { node, flowId } = await c.req.json();

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
        node,
        userId: user.id,
        flowId
      },
      create: {
        id,
        node,
        userId: user.id,
        flowId
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
  const { id, flowId } = await c.req.json();

  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  try {
    await prisma.node.delete({
      where: {
        id,
        flowId
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

export const getFlowAndNodeContentFromDb = async (c: Context) => {
  const user = c.get("user");

  if (!user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { flowId } = c.req.query();

  const data = await prisma.flow.findFirst({
    where: {
      userId: user.id,
      id: flowId
    }
  });
  const parsedFlow = JSON.parse(data?.flow || "{}");

  const nodes = await prisma.node.findMany({
    where: {
      userId: user.id,
      flowId
    }
  });
  const parsedNodes = nodes.map((n) => JSON.parse(n.node || "{}"));

  return c.json({ flow: parsedFlow, nodes: parsedNodes });
};
