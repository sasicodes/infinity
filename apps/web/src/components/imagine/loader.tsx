import { LoaderIcon } from "lucide-react";
import { tw } from "../ui/tw";

export const Loader = ({ iconClassName }: { iconClassName?: string }) => {
  return (
    <div className="flex h-36 w-full items-center justify-center">
      <LoaderIcon className={tw("size-2 animate-spin", iconClassName)} />
    </div>
  );
};
