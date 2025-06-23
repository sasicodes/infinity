import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { Avatar } from "../components/home/avatar";
import { MyPostsFeed } from "../components/profile/feed";

export const Profile = () => {
  const { user } = useDynamicContext();

  return (
    <div>
      <div className="flex items-center gap-3 border-neutral-200 border-b p-6">
        <Avatar id={user?.username ?? ""} className="size-16" />
        <div className="font-medium text-lg">{user?.username}</div>
      </div>
      <MyPostsFeed />
    </div>
  );
};
