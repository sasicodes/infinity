import { useEffect } from "react";

export const useSelectAll = (
  setNodes: React.Dispatch<React.SetStateAction<Node[]>>
) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key === "a") {
        event.preventDefault();
        setNodes((nds: Node[]) =>
          nds.map((node: Node) => ({
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