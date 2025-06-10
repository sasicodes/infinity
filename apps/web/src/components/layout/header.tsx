import { Infinity as InfinityIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-neutral-200 border-b px-4 py-3">
      <span>
        <InfinityIcon className="size-6" />
      </span>
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
};
