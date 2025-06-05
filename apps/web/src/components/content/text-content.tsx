import { useRef, useEffect } from "react";
import { db } from "../../lib/idb";

interface TextContentProps {
  nodeId: string;
  content: string;
  image: string | undefined;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const TextContent = ({
  nodeId,
  content,
  image,
  isEditing,
  setIsEditing,
  onKeyDown
}: TextContentProps) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      // Move cursor to end
      const length = textareaRef.current.value.length;
      textareaRef.current.setSelectionRange(length, length);
    }
  }, [isEditing]);

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

  if (!isEditing) return null;

  return (
    <div className="h-full w-full">
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={onKeyDown}
        className="h-[200%] w-[200%] resize-none bg-transparent p-2 text-white text-xs outline-none [transform-origin:top_left] [transform:scale(0.5)]"
      />
    </div>
  );
};
