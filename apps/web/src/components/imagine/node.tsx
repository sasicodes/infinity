import { Handle, type NodeProps, Position } from "@xyflow/react";
import clsx from "clsx";
import { useLiveQuery } from "dexie-react-hooks";
import { useParams } from "react-router";
import { loadNodeContent } from "../../lib/idb";
import { Content } from "./content";

export const CustomNode = ({ id, selected }: NodeProps) => {
  const params = useParams();
  const flowId = params.flowId;
  const nodeData = useLiveQuery(() => loadNodeContent(id), [id]);
  const hasGeneratedContent = nodeData?.generated;

  return (
    <div
      className={clsx(
        "min-w-44 rounded-xl bg-white p-1 ring transition-all duration-200",
        selected ? "ring-neutral-400" : "ring-neutral-200",
        !hasGeneratedContent && "max-w-80"
      )}
    >
      <Handle
        type="target"
        position={Position.Left}
        className="!bg-white !border-neutral-300 -translate-x-2 !size-2 transition-colors"
      />
      <div className="flex cursor-default flex-col items-center justify-center gap-2">
        <Content nodeId={id} flowId={flowId as string} />
      </div>
      <Handle
        type="source"
        position={Position.Right}
        className="!bg-white !border-neutral-300 !size-2 translate-x-2 transition-colors"
      />
    </div>
  );
};
