import { Handle, Position, type NodeProps } from "@xyflow/react";
import clsx from "clsx";
import { Content } from "./content";

export const CustomNode = ({ id, selected }: NodeProps) => {
  return (
    <div
      className={clsx(
        "min-w-44 overflow-hidden rounded-lg border bg-neutral-900 p-1 transition-all duration-200",
        selected ? "border-neutral-500" : "border-neutral-800"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-neutral-700 hover:!bg-neutral-500 !border-neutral-600 size-2.5 transition-colors"
      />
      <div className="flex h-36 cursor-default flex-col items-center justify-center gap-2">
        <Content nodeId={id} />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-neutral-700 hover:!bg-neutral-500 !border-neutral-600 size-2.5 transition-colors"
      />
    </div>
  );
};
