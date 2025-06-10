import { Infinity as InfinityIcon } from "lucide-react";
import { Button } from "../ui/button";

export const Header = () => {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-neutral-200 border-b bg-[#f5f5f550] px-4 py-3 backdrop-blur-2xl">
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
