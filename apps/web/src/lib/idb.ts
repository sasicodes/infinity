import type { Edge, Node } from "@xyflow/react";
import Dexie, { type Table } from "dexie";
import { debounce } from "./debounce";
import {
  syncDeleteNodeContentToDb,
  syncFlowAndNodeContentFromDb,
  syncFlowToDb,
  syncNodeContentToDb
} from "./sync";

export interface FlowData {
  id: string;
  nodes: Node[];
  edges: Edge[];
}

export interface NodeContent {
  id: string;
  content?: string;
  imageUrl?: string;
  generated?: string;
}

class FlowDatabase extends Dexie {
  flowData!: Table<FlowData>;
  nodeContent!: Table<NodeContent>;

  constructor() {
    super("infinity");
    this.version(1).stores({
      flowData: "++id",
      nodeContent: "id"
    });
  }
}

export const db = new FlowDatabase();

const debouncedSyncFlow = debounce(async (data: FlowData) => {
  await syncFlowToDb(data);
}, 500);

export async function saveFlowData(data: FlowData): Promise<void> {
  await db.flowData.clear();
  await db.flowData.add(data);

  debouncedSyncFlow(data);
}

const debouncedSync = debounce(async (data: NodeContent, flowId: string) => {
  await syncNodeContentToDb(data, flowId);
}, 500);

export async function saveNodeContent(
  data: NodeContent,
  flowId: string
): Promise<void> {
  await db.nodeContent.put(data);

  debouncedSync(data, flowId);
}

export async function loadFlowData(): Promise<FlowData | undefined> {
  return db.flowData.orderBy("id").last();
}

export async function loadNodeContent(
  id: string
): Promise<NodeContent | undefined> {
  return db.nodeContent.get(id);
}

export async function deleteNodeContent(
  id: string,
  flowId: string
): Promise<void> {
  await db.nodeContent.delete(id);

  syncDeleteNodeContentToDb(id, flowId);
}

export async function initializeFromDb(flowId: string) {
  const { flow, nodes } = await syncFlowAndNodeContentFromDb(flowId);
  if (flow) {
    await db.flowData.add(flow);
  }
  if (nodes) {
    await db.nodeContent.bulkPut(nodes);
  }
}
