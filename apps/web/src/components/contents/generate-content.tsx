import { Loader } from "lucide-react";

interface GenerateContentProps {
  completion?: string;
  generated?: string;
  streaming: boolean;
}

export const GenerateContent = ({
  completion,
  generated,
  streaming
}: GenerateContentProps) => {
  if (streaming) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader className="size-2 animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative mx-auto aspect-video w-[500px]">
      <div className="-mt-5 -ml-3 absolute scale-50 cursor-move font-mono text-gray-500 text-xs uppercase">
        Generated
      </div>
      <iframe
        srcDoc={completion || generated}
        title="Generated content"
        className="h-full w-full overflow-hidden rounded-lg border-none"
        sandbox="allow-scripts"
      />
    </div>
  );
};
