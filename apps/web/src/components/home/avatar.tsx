interface AvatarProps {
  id: string;
}

export const Avatar = ({ id }: AvatarProps) => {
  return (
    <div className="size-8 rounded-full bg-neutral-200">
      <img
        src={`https://api.dicebear.com/9.x/glass/svg?seed=${id}`}
        className="rounded-full"
        draggable={false}
        alt={id}
      />
    </div>
  );
};
