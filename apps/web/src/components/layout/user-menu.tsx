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
        <Avatar
          id={user?.username ?? ""}
          className="size-7"
          src={`https://api.dicebear.com/9.x/initials/svg?seed=${user?.username}`}
        />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-44" sideOffset={10}>
        <DropdownMenuItem onClick={() => navigate(`/u/${user?.username}`)}>
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            handleLogOut();
            navigate("/");
          }}
        >
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
