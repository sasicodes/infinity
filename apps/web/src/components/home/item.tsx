import { Loader } from "lucide-react";
import { useState } from "react";
import { formatDate, injectStylesForPost } from "../../lib/functions";
import { Actions } from "./actions";
import { Avatar } from "./avatar";
import type { Post } from "./type";

interface ItemProps {
  post: Post;
}

export const Item = ({ post }: ItemProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const contentWithStyles = injectStylesForPost(post.html);

  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <Avatar id={post.username} />
        <div className="flex flex-col">
          <span className="font-medium text-sm">{post.username}</span>
          <span
            className="text-neutral-400 text-xs"
            title={post.createdAt.toLocaleString()}
          >
            {formatDate(post.createdAt)}
          </span>
        </div>
      </div>
      <div className="mt-4 text-neutral-500">{post.content}</div>
      <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-3xl border border-neutral-200">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <Loader className="size-4 animate-spin" />
          </div>
        )}
        <iframe
          srcDoc={contentWithStyles}
          title="Generated content"
          className="h-full w-full overflow-hidden rounded-lg border-none"
          sandbox="allow-scripts allow-same-origin"
          onLoad={() => setIsLoading(false)}
        />
      </div>
      <Actions post={post} />
    </div>
  );
};
