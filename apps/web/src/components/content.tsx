import { useState, useRef, useEffect } from "react";
import { db } from "../lib/idb";
import { useLiveQuery } from "dexie-react-hooks";
import { Image, Type, Trash2 } from "lucide-react";

interface ContentProps {
  nodeId: string;
}

export const Content = ({ nodeId }: ContentProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Use live query to read from IndexedDB
  const nodeData = useLiveQuery(() => db.nodeContent.get(nodeId), [nodeId]);
  const content = nodeData?.content || "";
  const image = nodeData?.image;
  const isLoading = nodeData === undefined;

  // Initialize new node in IndexedDB
  useEffect(() => {
    const initNode = async () => {
      const exists = await db.nodeContent.get(nodeId);
      if (!exists) {
        await db.nodeContent.put({
          id: nodeId,
          content: "",
          image: undefined
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

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (event) => {
      const result = event.target?.result as string;
      await db.nodeContent.put({
        id: nodeId,
        content,
        image: result
      });
      setIsEditing(false);
    };
    reader.readAsDataURL(file);
  };

  const handleTextChange = async (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    await db.nodeContent.put({
      id: nodeId,
      content: e.target.value,
      image
    });
  };

  const handleTextBlur = () => {
    if (!content.trim()) {
      setIsEditing(false);
    }
  };

  const handleTextClick = () => {
    setIsEditing(true);
    // Focus textarea after a small delay to ensure it's rendered
    setTimeout(() => {
      textareaRef.current?.focus();
    }, 0);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === "Escape") {
      if (!content.trim()) {
        setIsEditing(false);
      }
    }
  };

  if (isLoading) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {image ? (
        <div className="relative h-full w-full">
          <img
            src={image}
            alt="Node content"
            className="h-full w-full rounded-sm object-cover"
            draggable={false}
            onClick={() => setIsEditing(true)}
            onKeyDown={handleKeyDown}
          />
          {isEditing && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/50">
              <button
                type="button"
                onClick={async () => {
                  await db.nodeContent.put({
                    id: nodeId,
                    content,
                    image: undefined
                  });
                  setIsEditing(false);
                }}
                onKeyDown={handleKeyDown}
                className="flex scale-50 items-center gap-1 rounded bg-red-500 px-2 py-1 text-white text-xs hover:bg-red-600"
              >
                <Trash2 className="size-3" />
                Remove
              </button>
            </div>
          )}
        </div>
      ) : isEditing ? (
        <div className="h-full w-full">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleTextChange}
            onBlur={handleTextBlur}
            onKeyDown={handleKeyDown}
            className="h-[200%] w-[200%] resize-none bg-transparent p-2 text-white text-xs outline-none [transform-origin:top_left] [transform:scale(0.5)]"
          />
        </div>
      ) : (
        <div
          className="flex h-full w-full scale-50 cursor-pointer flex-col items-center justify-center gap-2"
          onKeyDown={handleKeyDown}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 font-normal text-gray-300 text-xs leading-none hover:text-white"
            onClick={handleUploadClick}
            onKeyDown={handleKeyDown}
          >
            <Image className="size-3" />
            Upload an image
          </button>
          <span className="text-[10px] text-neutral-500">or</span>
          <button
            type="button"
            className="flex cursor-pointer items-center gap-1 font-normal text-gray-300 text-xs leading-none hover:text-white"
            onClick={handleTextClick}
            onKeyDown={handleKeyDown}
          >
            <Type className="size-3" />
            Write or paste text
          </button>
        </div>
      )}
    </div>
  );
};
