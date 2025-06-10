import { Loader } from "lucide-react";
import { Item } from "./item";

export const Feed = () => {
  const posts = [
    {
      id: 1,
      title: "Post 1",
      content: "This is the content of post 1"
    },
    {
      id: 2,
      title: "Post 2",
      content: "This is the content of post 2"
    }
  ];

  return (
    <div className="flex flex-col divide-y divide-neutral-200">
      {posts.map((post) => (
        <Item key={post.id} post={post} />
      ))}
      <div className="flex items-center justify-center py-6">
        <Loader className="size-4 animate-spin" />
      </div>
    </div>
  );
};
