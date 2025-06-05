import { Code, RefreshCcw } from "lucide-react";
import { Loader } from "../loader";

interface GenerateContentProps {
  completion?: string;
  generated?: string;
  streaming: boolean;
  regenerate: () => void;
}

const injectStyles = (content: string) => {
  const styles = `
    <style>
      html, body {
        transform: scale(0.7);
        -ms-overflow-style: none !important;
        scrollbar-width: none !important;
      }
      ::-webkit-scrollbar {
        display: none !important;
      }
    </style>
  `;
  return content.replace("</head>", `${styles}</head>`);
};

export const GenerateContent = ({
  completion,
  generated,
  streaming,
  regenerate
}: GenerateContentProps) => {
  if (streaming) {
    return <Loader />;
  }

  const content = completion || generated || "";
  const contentWithStyles = injectStyles(content);

  return (
    <div className="relative">
      <div className="-mt-5 -ml-3 absolute scale-50 cursor-move font-mono text-gray-500 text-xs uppercase">
        Generated
      </div>
      <div className="-mt-5 absolute right-0 flex gap-1">
        <button
          title="Copy Code"
          type="button"
          className="scale-50 cursor-pointer font-mono text-gray-500 text-xs uppercase"
          onClick={() => {
            navigator.clipboard.writeText(content);
          }}
        >
          <Code className="size-3" />
        </button>
        <button
          title="Regenerate"
          type="button"
          className="scale-50 cursor-pointer font-mono text-gray-500 text-xs uppercase"
          onClick={regenerate}
        >
          <RefreshCcw className="size-3" />
        </button>
      </div>
      <iframe
        srcDoc={contentWithStyles}
        title="Generated content"
        className="h-full w-full overflow-hidden rounded-lg border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
