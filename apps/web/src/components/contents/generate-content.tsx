import { Loader } from "../loader";

interface GenerateContentProps {
  completion?: string;
  generated?: string;
  streaming: boolean;
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
  streaming
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
      <iframe
        srcDoc={contentWithStyles}
        title="Generated content"
        className="h-full w-full overflow-hidden rounded-lg border-none"
        sandbox="allow-scripts allow-same-origin"
      />
    </div>
  );
};
