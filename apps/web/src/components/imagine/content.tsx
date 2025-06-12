import type { Edge } from "@xyflow/react";
import { useLiveQuery } from "dexie-react-hooks";
import { useEffect, useRef, useState } from "react";
import { useGenerate } from "../../lib/hooks/use-generate";
import { db, loadNodeContent, saveNodeContent } from "../../lib/idb";
import { EmptyContent } from "./contents/empty-content";
import { GenerateContent } from "./contents/generate-content";
import { ImageContent } from "./contents/image-content";
import { TextContent } from "./contents/text-content";
import { Loader } from "./loader";

interface ContentProps {
  nodeId: string;
}

export const Content = ({ nodeId }: ContentProps) => {
  const { completion, generate, streaming, setStreaming } = useGenerate();
  const [isEditing, setIsEditing] = useState(false);

  // Use live query to read from IndexedDB
  const nodeData = useLiveQuery(() => db.nodeContent.get(nodeId), [nodeId]);
  const edges = useLiveQuery(() =>
    db.flowData
      .orderBy("id")
      .last()
      .then((data) => data?.edges ?? [])
  );

  const content = nodeData?.content || "";
  const imageUrl = nodeData?.imageUrl;
  const generated = nodeData?.generated;
  const isLoading = nodeData === undefined;

  // Get parent nodes and their content
  const parentContent = useLiveQuery(async () => {
    if (!edges?.length) return { images: 0, texts: 0 };

    // Check if node has any right-side connections
    const hasRightConnections = edges.some((edge) => edge.source === nodeId);
    if (hasRightConnections) return { images: 0, texts: 0 };

    const parentNodes = new Set<string>();
    const traverse = (currentId: string) => {
      const parentEdges =
        edges?.filter((edge: Edge) => edge.target === currentId) ?? [];
      for (const edge of parentEdges) {
        const parentId = edge.source;
        if (!parentNodes.has(parentId)) {
          parentNodes.add(parentId);
          traverse(parentId);
        }
      }
    };

    traverse(nodeId);
    const parentIds = Array.from(parentNodes);
    if (parentIds.length === 0) return { images: 0, texts: 0 };

    const parentContents = await Promise.all(
      parentIds.map((id) => loadNodeContent(id))
    );

    const images = parentContents.filter((content) => content?.imageUrl).length;
    const texts = parentContents.filter((content) =>
      content?.content?.trim()
    ).length;

    return { images, texts, parentContents };
  }, [edges, nodeId]);

  const initialized = useRef(false);

  useEffect(() => {
    const initNode = async () => {
      if (initialized.current) return;
      initialized.current = true;

      const exists = await loadNodeContent(nodeId);
      if (!exists) {
        await saveNodeContent({
          id: nodeId,
          content: "",
          imageUrl: undefined,
          generated: undefined
        });
      }
    };
    initNode();
  }, [nodeId]);

  // Set initial editing state based on content
  useEffect(() => {
    if (content?.trim()) {
      setIsEditing(true);
    }
  }, [content]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (!content.trim()) {
        setIsEditing(false);
      }
    }
  };

  const handleGenerateCode = async () => {
    setStreaming(true);
    const imageUrls =
      parentContent?.parentContents?.map((content) => content?.imageUrl) || [];

    const content =
      parentContent?.parentContents
        ?.map((content) => content?.content)
        .join("\n") || "";
    const prompt =
      imageUrls.length > 0
        ? `${content}\n\nReference images:\n${imageUrls.join("\n")}`
        : content;
    await generate(prompt);
  };

  // Store completion when available
  useEffect(() => {
    if (completion) {
      saveNodeContent({
        id: nodeId,
        content,
        imageUrl,
        generated: completion
      });
    }
  }, [completion, nodeId, content, imageUrl]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center transition-opacity duration-200">
      {streaming ? (
        <Loader />
      ) : completion || generated ? (
        <GenerateContent
          completion={completion}
          generated={generated}
          streaming={streaming}
          regenerate={handleGenerateCode}
        />
      ) : imageUrl ? (
        <ImageContent
          nodeId={nodeId}
          imageUrl={imageUrl}
          content={content}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onKeyDown={handleKeyDown}
        />
      ) : isEditing ? (
        <TextContent
          nodeId={nodeId}
          content={content}
          imageUrl={imageUrl}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onKeyDown={handleKeyDown}
        />
      ) : (
        <EmptyContent
          nodeId={nodeId}
          content={content}
          parentContent={parentContent}
          onKeyDown={handleKeyDown}
          onGenerateCode={handleGenerateCode}
          setIsEditing={setIsEditing}
        />
      )}
    </div>
  );
};
