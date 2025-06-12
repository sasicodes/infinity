import type { Edge, Node } from "@xyflow/react";
import Dexie, { type Table } from "dexie";
import {
  syncDeleteNodeContentToDb,
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

export async function saveFlowData(data: FlowData): Promise<void> {
  // Clear existing data
  await db.flowData.clear();
  // Save new data
  await db.flowData.add(data);

  syncFlowToDb(data);
}

export async function saveNodeContent(data: NodeContent): Promise<void> {
  await db.nodeContent.put(data);

  syncNodeContentToDb(data);
}

export async function loadFlowData(): Promise<FlowData | undefined> {
  return db.flowData.orderBy("id").last();
}

export async function loadNodeContent(
  id: string
): Promise<NodeContent | undefined> {
  return db.nodeContent.get(id);
}

export async function deleteNodeContent(id: string): Promise<void> {
  await db.nodeContent.delete(id);

  syncDeleteNodeContentToDb(id);
}
