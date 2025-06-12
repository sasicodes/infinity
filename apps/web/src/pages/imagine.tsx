import {
  Background,
  BackgroundVariant,
  type Connection,
  type Edge,
  type Node,
  ReactFlow,
  ReactFlowProvider,
  useEdgesState,
  useNodesState,
  useReactFlow
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useLiveQuery } from "dexie-react-hooks";
import { MousePointerClick } from "lucide-react";
import { useCallback, useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { CustomEdge } from "../components/imagine/edge";
import { CustomNode } from "../components/imagine/node";
import { useSelectAll } from "../lib/hooks/use-select-all";
import { deleteNodeContent, loadFlowData, saveFlowData } from "../lib/idb";
import { db } from "../lib/idb";

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
  const saveTimeoutRef = useRef<number | undefined>(undefined);
  const isInitialLoad = useRef(true);
  const { user } = useDynamicContext();

  // Load initial data from IndexedDB
  useEffect(() => {
    const loadData = async () => {
      const data = await loadFlowData();
      if (data) {
        setNodes(data.nodes);
        setEdges(data.edges);
      }
      isInitialLoad.current = false;
    };
    loadData();
  }, [setNodes, setEdges]);

  // Save data to IndexedDB with debouncing
  useEffect(() => {
    // Don't save if we're still loading initial data or if we have no data
    if (isInitialLoad.current || (!nodes.length && !edges.length)) return;

    if (saveTimeoutRef.current) {
      window.clearTimeout(saveTimeoutRef.current);
    }

    saveTimeoutRef.current = window.setTimeout(async () => {
      await saveFlowData({ nodes, edges, id: user?.userId ?? "" });
    }, 500); // Debounce for 500ms

    return () => {
      if (saveTimeoutRef.current) {
        window.clearTimeout(saveTimeoutRef.current);
      }
    };
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

  const isValidConnection = useCallback(
    (params: Connection | Edge) => {
      if ("id" in params) return false; // Skip if it's an Edge
      return validateConnection(params);
    },
    [validateConnection]
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
    },
    [validateConnection, edges, setEdges]
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

  const onNodesDelete = useCallback(
    async (params: Node[]) => {
      // Delete node content from IndexedDB
      await Promise.all(params.map((node) => deleteNodeContent(node.id)));

      // Update flow data by removing deleted nodes and their connected edges
      const deletedNodeIds = new Set(params.map((node) => node.id));
      const updatedNodes = nodes.filter((node) => !deletedNodeIds.has(node.id));
      const updatedEdges = edges.filter(
        (edge) =>
          !deletedNodeIds.has(edge.source) && !deletedNodeIds.has(edge.target)
      );

      // Save updated flow data
      await saveFlowData({
        nodes: updatedNodes,
        edges: updatedEdges,
        id: user?.userId ?? ""
      });
    },
    [nodes, edges]
  );

  useSelectAll(setNodes);

  return (
    <div
      className="h-[calc(100vh-var(--header-height))] w-screen"
      ref={reactFlowWrapper}
    >
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
        onNodesDelete={onNodesDelete}
        onConnect={onConnect}
        onPaneClick={onPaneClick}
        proOptions={{ hideAttribution: true }}
        isValidConnection={isValidConnection}
        fitView
        panOnScroll
        zoomOnDoubleClick={false}
        deleteKeyCode={["Backspace", "Delete"]}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
      >
        <Background variant={BackgroundVariant.Dots} gap={15} size={0.5} />
      </ReactFlow>
    </div>
  );
};

export const Imagine = () => {
  const data = useLiveQuery(() => db.flowData.orderBy("id").last());
  const isLoading = data === undefined;
  const isStarted = data?.nodes && data.nodes.length > 0;

  return (
    <ReactFlowProvider>
      <div className="flex cursor-pointer">
        {!isLoading && !isStarted ? (
          <div className="absolute inset-0">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <MousePointerClick className="size-10" strokeWidth={1.5} />
              <span>Double click anywhere to start</span>
            </div>
          </div>
        ) : null}
        <Flow />
      </div>
    </ReactFlowProvider>
  );
};
