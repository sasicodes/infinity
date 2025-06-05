import { Trash2 } from "lucide-react";
import { db } from "../../lib/idb";

interface ImageContentProps {
  nodeId: string;
  image: string;
  content: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const ImageContent = ({
  nodeId,
  image,
  content,
  isEditing,
  setIsEditing,
  onKeyDown
}: ImageContentProps) => {
  return (
    <div className="relative h-full w-full">
      <img
        src={image}
        alt="Node content"
        className="h-full w-full rounded-sm object-cover"
        draggable={false}
        onClick={() => setIsEditing(true)}
        onKeyDown={onKeyDown}
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
            onKeyDown={onKeyDown}
            className="flex scale-50 items-center gap-1 rounded bg-red-500 px-2 py-1 text-white text-xs hover:bg-red-600"
          >
            <Trash2 className="size-3" />
            Remove
          </button>
        </div>
      )}
    </div>
  );
};
