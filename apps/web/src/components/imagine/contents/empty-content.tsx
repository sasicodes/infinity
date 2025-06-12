import { Code2, Image, Type } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useRef } from "react";
import { saveNodeContent } from "../../../lib/idb";
import { uploadToR2 } from "../../../lib/upload";

interface EmptyContentProps {
  nodeId: string;
  content: string;
  parentContent?: {
    images: number;
    texts: number;
    parentContents?: Array<{ content?: string } | undefined>;
  };
  onKeyDown: (e: React.KeyboardEvent) => void;
  onGenerateCode: () => void;
  setIsEditing: (editing: boolean) => void;
}

export const EmptyContent = ({
  nodeId,
  content,
  parentContent,
  onKeyDown,
  onGenerateCode,
  setIsEditing
}: EmptyContentProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const blobUrl = URL.createObjectURL(file);

    // Save with blob URL first
    await saveNodeContent({
      id: nodeId,
      content,
      imageUrl: blobUrl
    });

    // Upload to R2 and update with permanent URL
    uploadToR2(file).then((imageUrl) => {
      saveNodeContent({
        id: nodeId,
        content,
        imageUrl
      });
      // Clean up blob URL
      URL.revokeObjectURL(blobUrl);
    });
  };

  return (
    <div
      className="flex h-36 w-full scale-50 flex-col items-center justify-center gap-2 transition-opacity duration-200"
      onKeyDown={onKeyDown}
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
        className="flex cursor-pointer items-center gap-1 p-1 font-normal text-neutral-500 text-xs leading-none hover:text-neutral-700"
        onClick={handleUploadClick}
        onKeyDown={onKeyDown}
      >
        <Image className="size-3" />
        Upload an image
      </button>
      <span className="text-[10px] text-neutral-500">or</span>
      <button
        type="button"
        className="flex cursor-pointer items-center gap-1 p-1 font-normal text-neutral-500 text-xs leading-none hover:text-neutral-700"
        onClick={() => setIsEditing(true)}
        onKeyDown={onKeyDown}
      >
        <Type className="size-3" />
        Write or paste text
      </button>
      <AnimatePresence>
        {parentContent &&
        (parentContent.images > 0 || parentContent.texts > 0) ? (
          <motion.div
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.4 }}
          >
            <span className="text-[10px] text-neutral-500">or</span>
            <button
              type="button"
              className="flex cursor-pointer items-center gap-1 p-1 font-normal text-neutral-500 text-xs leading-none hover:text-neutral-700"
              onClick={onGenerateCode}
              onKeyDown={onKeyDown}
            >
              <Code2 className="size-3" />
              Generate Code
            </button>
            <div className="cursor-default select-none text-[10px] text-neutral-400">
              {parentContent.images > 0 && (
                <span>
                  {parentContent.images} image
                  {parentContent.images > 1 ? "s" : ""}
                </span>
              )}
              {parentContent.images > 0 && parentContent.texts > 0 && (
                <span> • </span>
              )}
              {parentContent.texts > 0 && (
                <span>
                  {parentContent.texts} text
                  {parentContent.texts > 1 ? "s" : ""}
                </span>
              )}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
};
