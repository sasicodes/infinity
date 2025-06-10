import { Infinity as InfinityIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="flex items-center justify-between border-neutral-200 border-b px-4 py-3">
      <span className="group relative">
        <InfinityIcon className="size-6 text-neutral-500" />
        <InfinityIcon className="absolute inset-0 size-6 rotate-90 text-neutral-500 transition-transform duration-500 group-hover:rotate-0" />
      </span>
      <div>
        <Button>Sign in</Button>
      </div>
    </div>
  );
};
