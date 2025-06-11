import { tw } from "../ui/tw";

interface AvatarProps {
  id: string;
  className?: string;
}

export const Avatar = ({ id, className }: AvatarProps) => {
  return (
    <div className={tw("size-8 rounded-full bg-neutral-200", className)}>
      <img
        src={`https://api.dicebear.com/9.x/glass/svg?seed=${id}`}
        className="rounded-full"
        draggable={false}
        alt={id}
      />
    </div>
  );
};
