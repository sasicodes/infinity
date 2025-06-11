import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { saveNodeContent } from "../../../lib/idb";

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
    await saveNodeContent({
      id: nodeId,
      content: e.target.value,
      image: image ? new Blob([image]) : undefined
    });
  };

  const handleTextBlur = () => {
    if (!content.trim()) {
      setIsEditing(false);
    }
  };

  if (!isEditing) return null;

  return (
    <div className="h-36 w-full">
      <motion.div
        className="-mt-5 -ml-2 absolute scale-50 cursor-move font-mono text-gray-500 text-xs uppercase"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
      >
        Text
      </motion.div>
      <textarea
        ref={textareaRef}
        value={content}
        onChange={handleTextChange}
        onBlur={handleTextBlur}
        onKeyDown={onKeyDown}
        placeholder="Write something..."
        className="h-[200%] w-[200%] cursor-default resize-none bg-transparent p-2 text-black text-sm outline-none [scrollbar-width:thin] [transform-origin:top_left] [transform:scale(0.5)]"
      />
    </div>
  );
};
