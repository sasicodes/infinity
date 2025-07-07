import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useAccount } from "wagmi";
import { Avatar } from "../components/home/avatar";
import { MyPostsFeed } from "../components/profile/feed";

export const Profile = () => {
  const { address } = useAccount();
  const { user } = useDynamicContext();

  return (
    <div>
      <div className="flex items-center gap-3 border-neutral-200 border-b p-6">
        <Avatar id={user?.username ?? ""} className="size-16" />
        <div className="flex flex-col">
          <div className="font-medium text-lg">{user?.username}</div>
          <div className="text-neutral-500 text-sm" title={address}>
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </div>
        </div>
      </div>
      <MyPostsFeed />
    </div>
  );
};
