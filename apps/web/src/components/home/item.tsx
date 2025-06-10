interface ItemProps {
  post: {
    id: number;
    title: string;
    content: string;
  };
}

export const Item = ({ post }: ItemProps) => {
  return <div className="p-4">{post.content}</div>;
};
