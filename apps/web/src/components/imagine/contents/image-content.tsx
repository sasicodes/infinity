import { Trash2 } from "lucide-react";
import { saveNodeContent } from "../../../lib/idb";

interface ImageContentProps {
  nodeId: string;
  flowId: string;
  imageUrl: string;
  content: string;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
}

export const ImageContent = ({
  nodeId,
  flowId,
  imageUrl,
  content,
  isEditing,
  setIsEditing,
  onKeyDown
}: ImageContentProps) => {
  return (
    <div className="relative h-36 w-full">
      <div className="-mt-5 -ml-2 absolute scale-50 cursor-move font-mono text-gray-500 text-xs uppercase">
        Image
      </div>
      <img
        src={imageUrl}
        alt="Node content"
        className="h-full w-full rounded-lg object-cover"
        draggable={false}
        onClick={() => setIsEditing(true)}
        onKeyDown={onKeyDown}
      />
      {isEditing && (
        <div
          className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50"
          onKeyDown={() => setIsEditing(false)}
          onClick={() => setIsEditing(false)}
        >
          <button
            type="button"
            onClick={async () => {
              await saveNodeContent(
                {
                  id: nodeId,
                  content,
                  imageUrl: undefined
                },
                flowId
              );
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
