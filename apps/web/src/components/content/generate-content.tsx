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
    <div className="h-full w-full">
      <iframe
        srcDoc={completion || generated}
        title="Generated content"
        className="pointer-events-none h-full w-full overflow-hidden rounded-sm border-none"
        sandbox="allow-scripts"
      />
    </div>
  );
};
