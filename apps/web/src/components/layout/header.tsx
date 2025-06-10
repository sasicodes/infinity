import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Infinity as InfinityIcon } from "lucide-react";
import { motion } from "motion/react";
import { Button } from "../ui/button";

export const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const { setShowAuthFlow, handleLogOut } = useDynamicContext();

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-neutral-200 border-b bg-[#f5f5f550] px-4 py-3 backdrop-blur-2xl">
      <span className="relative">
        <motion.div
          initial={{ rotate: 0 }}
          animate={{ rotate: 90 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <InfinityIcon className="size-6 text-neutral-500" />
        </motion.div>
        <InfinityIcon className="absolute inset-0 size-6 text-neutral-500" />
      </span>
      <div>
        <Button
          onClick={() => (isLoggedIn ? handleLogOut() : setShowAuthFlow(true))}
        >
          {isLoggedIn ? "Sign out" : "Sign in"}
        </Button>
      </div>
    </div>
  );
};
