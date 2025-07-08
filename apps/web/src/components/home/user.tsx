import { Link } from "react-router";
import { formatDate } from "../../lib/functions";
import { Avatar } from "./avatar";

interface UserProps {
  username: string;
  createdAt: Date;
}

export const User = ({ username, createdAt }: UserProps) => {
  return (
    <Link to={`/u/${username}`} className="flex items-center gap-2">
      <Avatar id={username} />
      <div className="flex flex-col">
        <span className="font-medium text-sm">{username}</span>
        <span
          className="text-neutral-400 text-xs"
          title={createdAt.toLocaleString()}
        >
          {formatDate(createdAt)}
        </span>
      </div>
    </Link>
  );
};
