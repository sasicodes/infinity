import { useState, useEffect } from "react";
import { db } from "../lib/idb";
import { useLiveQuery } from "dexie-react-hooks";
import type { Edge } from "@xyflow/react";
import { useGenerate } from "../lib/hooks/use-generate";
import { ImageContent } from "./contents/image-content";
import { TextContent } from "./contents/text-content";
import { EmptyContent } from "./contents/empty-content";
import { GenerateContent } from "./contents/generate-content";
import { Loader } from "./loader";
import { uploadImage } from "../lib/upload";

interface ContentProps {
  nodeId: string;
}

export const Content = ({ nodeId }: ContentProps) => {
  const { completion, generate, streaming } = useGenerate();
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
  const image = nodeData?.image;
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
      parentIds.map((id) => db.nodeContent.get(id))
    );

    const images = parentContents.filter((content) => content?.image).length;
    const texts = parentContents.filter((content) =>
      content?.content?.trim()
    ).length;

    return { images, texts, parentContents };
  }, [edges, nodeId]);

  // Initialize new node in IndexedDB
  useEffect(() => {
    const initNode = async () => {
      const exists = await db.nodeContent.get(nodeId);
      if (!exists) {
        await db.nodeContent.put({
          id: nodeId,
          content: "",
          image: undefined,
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
    const images =
      parentContent?.parentContents?.map((content) => content?.image) || [];
    const imageUrls = await Promise.all(
      images.map((image) => uploadImage(image as File))
    ).then((urls) => urls.filter(Boolean));
    console.info("🚀 ~ handleGenerateCode ~ imageUrls:", imageUrls);
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
      db.nodeContent.put({
        id: nodeId,
        content,
        image,
        generated: completion
      });
    }
  }, [completion, nodeId, content, image]);

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
      ) : image ? (
        <ImageContent
          nodeId={nodeId}
          image={image}
          content={content}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          onKeyDown={handleKeyDown}
        />
      ) : isEditing ? (
        <TextContent
          nodeId={nodeId}
          content={content}
          image={image}
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
