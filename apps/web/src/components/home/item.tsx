import { Loader } from "lucide-react";
import { Avatar } from "./avatar";

interface ItemProps {
  post: {
    id: string;
    title: string;
    content: string;
  };
}

export const Item = ({ post }: ItemProps) => {
  return (
    <div className="p-4">
      <div className="flex items-center gap-2">
        <Avatar id={post.id} />
        <div className="flex flex-col">
          <span className="font-medium text-sm">John Doe</span>
          <span className="text-neutral-400 text-xs">12 hours ago</span>
        </div>
      </div>
      <div className="mt-4 text-neutral-500">{post.content}</div>
      <div className="mt-4 flex aspect-video items-center justify-center rounded-3xl border border-neutral-200">
        <Loader className="size-4 animate-spin" />
      </div>
    </div>
  );
};
