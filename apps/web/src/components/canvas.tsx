import {
  Background,
  ReactFlow,
  BackgroundVariant,
  useNodesState,
  addEdge,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef, useEffect } from "react";
import { CustomNode } from "./node";
import { loadFlowData, saveFlowData } from "../lib/idb";
import { v4 as uuidv4 } from "uuid";
import { useSelectAll } from "../lib/hooks/use-select-all";

const nodeTypes = {
  custom: CustomNode
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const { screenToFlowPosition } = useReactFlow();

  // Load initial data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      const data = await loadFlowData();
      if (data) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
    };
    loadData();
  }, [setNodes, setEdges]);

  // Save data to IndexedDB whenever nodes or edges change
  useEffect(() => {
    const saveData = async () => {
      await saveFlowData({ nodes, edges });
    };
    saveData();
  }, [nodes, edges]);

  const onConnect = useCallback(
    (params: Connection) => {
      // Prevent self-loop
      if (params.source === params.target) return;

      // Prevent reverse connection (if an edge already exists from target to source)
      const reverseExists = edges.some(
        (e) => e.source === params.target && e.target === params.source
      );
      if (reverseExists) return;

      setEdges((eds) => addEdge(params, eds));
    },
    [setEdges, edges]
  );

  const onPaneClick = useCallback(
    (event: React.MouseEvent) => {
      // Only create node on double click (detail === 2)
      if (event.detail !== 2) return;

      const position = screenToFlowPosition({
        x: event.clientX,
        y: event.clientY
      });

      const id = uuidv4();
      const newNode: Node = {
        id,
        type: "custom",
        position,
        data: { label: id, edges }
      };
      setNodes((nds) => [...nds, newNode]);
    },
    [setNodes, screenToFlowPosition]
  );

  useSelectAll(setNodes);

  return (
    <div className="h-screen w-screen" ref={reactFlowWrapper}>
      <ReactFlow
        nodes={nodes.map((node) => ({
          ...node,
          data: {
            ...node.data,
            edges
          }
        }))}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        proOptions={{ hideAttribution: true }}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodeTypes={nodeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export const Canvas = () => {
  return <Flow />;
};
