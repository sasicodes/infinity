import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { Infinity as InfinityIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";

export const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="sticky top-0 z-10 flex h-15 items-center justify-between border-neutral-200 border-b bg-[#f5f5f550] px-4 py-3 backdrop-blur-2xl">
      <Link to="/" className="relative">
        <motion.div
          key="infinity-icon"
          initial={{ rotate: 0 }}
          animate={{ rotate: 90 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <InfinityIcon className="size-6 text-neutral-500" />
        </motion.div>
        <InfinityIcon className="absolute inset-0 size-6 text-neutral-500" />
      </Link>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <Button onClick={() => setShowAuthFlow(true)}>Sign in</Button>
      )}
    </div>
  );
};
