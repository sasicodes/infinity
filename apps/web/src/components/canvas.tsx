import {
  Background,
  ReactFlow,
  BackgroundVariant,
  useNodesState,
  useEdgesState,
  type Connection,
  type Node,
  type Edge,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useCallback, useRef, useEffect } from "react";
import { CustomNode } from "./node";
import { CustomEdge } from "./edge";
import { loadFlowData, saveFlowData, db } from "../lib/idb";
import { v4 as uuidv4 } from "uuid";
import { useSelectAll } from "../lib/hooks/use-select-all";

const nodeTypes = {
  custom: CustomNode
};

const edgeTypes = {
  custom: CustomEdge
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

  const validateConnection = useCallback(
    (params: Connection) => {
      // Prevent self-loop
      if (params.source === params.target) return false;

      // Prevent reverse connection
      const reverseExists = edges.some(
        (e) => e.source === params.target && e.target === params.source
      );
      if (reverseExists) return false;

      // Prevent connecting to a node that already has a right-side connection
      const targetHasRightConnection = edges.some(
        (e) => e.source === params.target
      );
      if (targetHasRightConnection) return false;

      // Prevent reconnecting the same nodes
      const sameConnectionExists = edges.some(
        (e) => e.source === params.source && e.target === params.target
      );
      if (sameConnectionExists) return false;

      return true;
    },
    [edges]
  );

  const getNodeDetails = useCallback(
    async (nodeId: string) => {
      const node = nodes.find((n) => n.id === nodeId);
      const content = await db.nodeContent.get(nodeId);

      return {
        id: node?.id,
        data: node?.data,
        content: content?.content,
        image: content?.image
      };
    },
    [nodes]
  );

  const getAllParentNodes = useCallback(
    (nodeId: string, edges: Edge[]): string[] => {
      const parentNodes = new Set<string>();

      const traverse = (currentId: string) => {
        const parentEdges = edges.filter((edge) => edge.target === currentId);
        for (const edge of parentEdges) {
          const parentId = edge.source;
          if (!parentNodes.has(parentId)) {
            parentNodes.add(parentId);
            traverse(parentId);
          }
        }
      };

      traverse(nodeId);
      return Array.from(parentNodes);
    },
    []
  );

  const onConnect = useCallback(
    async (params: Connection) => {
      if (!validateConnection(params)) return;
      if (!params.source || !params.target) return;

      const newEdge = {
        id: `edge-${params.source}-${params.target}`,
        source: params.source,
        target: params.target,
        type: "custom"
      };

      const updatedEdges = [...edges, newEdge];
      setEdges(updatedEdges);

      const parentNodes = getAllParentNodes(params.target, updatedEdges);
      const parentContents = await Promise.all(
        parentNodes.map((id) => db.nodeContent.get(id))
      );

      const images: string[] = [];
      const texts: string[] = [];

      for (const content of parentContents) {
        if (content?.image) images.push(content.image);
        if (content?.content?.trim()) texts.push(content.content.trim());
      }

      const parentContent = { images, texts };

      console.info("=== Node Connection ===", {
        source: await getNodeDetails(params.source),
        target: await getNodeDetails(params.target),
        parentContent,
        currentEdges: updatedEdges
      });
    },
    [validateConnection, getNodeDetails, edges, setEdges, getAllParentNodes]
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
        edges={edges.map((edge) => ({
          ...edge,
          type: "custom"
        }))}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        proOptions={{ hideAttribution: true }}
        fitView
        defaultViewport={{ x: 0, y: 0, zoom: 1 }}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export const Canvas = () => {
  return <Flow />;
};
