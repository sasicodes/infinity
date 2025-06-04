import { BaseEdge, getBezierPath } from "@xyflow/react";
import type { EdgeProps } from "@xyflow/react";

export const CustomEdge = ({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  selected
}: EdgeProps) => {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition
  });

  return (
    <BaseEdge
      path={edgePath}
      style={{
        stroke: selected ? "#a1a1a1" : "#404040",
        transition: "stroke 0.2s, stroke-width 0.2s"
      }}
    />
  );
};
