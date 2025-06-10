import type { Edge, Node } from "@xyflow/react";
import Dexie, { type Table } from "dexie";

export interface FlowData {
  id?: number;
  nodes: Node[];
  edges: Edge[];
}

export interface NodeContent {
  id: string;
  content?: string;
  image?: Blob;
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

export async function saveFlowData(data: Omit<FlowData, "id">): Promise<void> {
  // Clear existing data
  await db.flowData.clear();
  // Save new data
  await db.flowData.add(data);
}

export async function loadFlowData(): Promise<FlowData | undefined> {
  return db.flowData.orderBy("id").last();
}
