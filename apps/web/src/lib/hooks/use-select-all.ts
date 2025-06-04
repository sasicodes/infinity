import { useEffect } from "react";
import type { Node } from "@xyflow/react";

export const useSelectAll = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "a") {
        // Don't prevent default if we're in a text input or textarea
        const target = event.target as HTMLElement;
        if (target.tagName === "INPUT" || target.tagName === "TEXTAREA") {
          return;
        }

        event.preventDefault();
        setNodes((nds) =>
          nds.map((node) => ({
            ...node,
            selected: true
          }))
        );
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [setNodes]);
};
