import { useState } from "react";

interface UseGenerateReturn {
  completion: string;
  generate: (prompt: string) => Promise<void>;
  streaming: boolean;
}

function unescapeJSON(str: string) {
  return str.replace(/\\n/g, "\n").replace(/\\"/g, '"');
}

function extractInfinityCode(raw: string) {
  const match = raw.match(/<infinity-code[^>]*>([\s\S]*?)<\/infinity-code>/i);
  return match ? match[1].trim() : "";
}

export function useGenerate(): UseGenerateReturn {
  const [completion, setCompletion] = useState("");
  const [streaming, setStreaming] = useState(false);

  const generate = async (prompt: string) => {
    setStreaming(true);
    setCompletion("");

    try {
      const response = await fetch("http://localhost:3000/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ prompt })
      });

      if (!response.ok) {
        throw new Error("Failed to generate completion");
      }

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error("No reader available");
      }

      const decoder = new TextDecoder("utf-8");
      let buffer = "";
      let htmlBuffer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!/^\d+:/.test(trimmed)) continue;

          const splitIndex = trimmed.indexOf(":");
          if (splitIndex === -1) continue;

          const content = trimmed
            .slice(splitIndex + 1)
            .trim()
            .replace(/^"|"$/g, "");

          const escaped = unescapeJSON(content);
          if (escaped) {
            htmlBuffer += escaped;
          }
        }
      }

      setCompletion(extractInfinityCode(htmlBuffer));
    } catch (error) {
      console.error("Error generating completion:", error);
    } finally {
      setStreaming(false);
    }
  };

  return {
    completion,
    generate,
    streaming
  };
}
