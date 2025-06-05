import { Handle, Position, type NodeProps } from "@xyflow/react";
import clsx from "clsx";
import { Content } from "./content";
import { db } from "../lib/idb";
import { useLiveQuery } from "dexie-react-hooks";

export const CustomNode = ({ id, selected }: NodeProps) => {
  const nodeData = useLiveQuery(() => db.nodeContent.get(id), [id]);
  const hasGeneratedContent = nodeData?.generated;

  return (
    <div
      className={clsx(
        "min-w-44 rounded-xl bg-white p-1 ring transition-all duration-200 dark:bg-black",
        selected ? "ring-neutral-300" : "ring-neutral-200",
        hasGeneratedContent ? "" : "max-w-80"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white !border-neutral-300 -translate-x-2 !size-2 transition-colors"
      />
      <div className="flex cursor-default flex-col items-center justify-center gap-2">
        <Content nodeId={id} />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !border-neutral-300 !size-2 translate-x-2 transition-colors"
      />
    </div>
  );
};
