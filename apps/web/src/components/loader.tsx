import { LoaderIcon } from "lucide-react";

export const Loader = () => {
  return (
    <div className="flex h-36 w-full items-center justify-center">
      <LoaderIcon className="size-2 animate-spin" />
    </div>
  );
};
