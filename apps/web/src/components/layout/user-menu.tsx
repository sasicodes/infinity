import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { useNavigate } from "react-router";
import { Avatar } from "../home/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "../ui/dropdown";

export const UserMenu = () => {
  const navigate = useNavigate();
  const { user, handleLogOut } = useDynamicContext();

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger>
        <Avatar id={user?.userId ?? ""} className="size-7" />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44" sideOffset={10}>
        <DropdownMenuItem onClick={() => navigate(`/u/${user?.username}`)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => handleLogOut()}>
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
