import { HomeIcon, InfinityIcon, PlusIcon, SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";
import { Button } from "../ui/button";
import { tw } from "../ui/tw";

export const Sidebar = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const isExplorePage = location.pathname === "/explore";

  return (
    <div className="flex flex-col items-center justify-center gap-4 px-3 py-4">
      <Link to="/" className="relative mb-0.5">
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
      <div className="flex flex-col items-center justify-center gap-4">
        <div className="flex flex-col items-center justify-center gap-0.5 rounded-full bg-neutral-200/60 p-1">
          <Link
            to="/"
            className={tw(
              "relative flex size-9 items-center justify-center rounded-full",
              isHomePage && "bg-[#f5f5f5] shadow-inner"
            )}
          >
            {isHomePage ? (
              <motion.span
                key="home-indicator"
                layoutId="page-switcher"
                transition={{
                  type: "spring",
                  duration: 0.2,
                  bounce: 0
                }}
                className="absolute inset-0 rounded-full bg-[#f5f5f5]"
              />
            ) : null}
            <HomeIcon
              className={tw(
                "relative size-4",
                !isHomePage && "text-neutral-400"
              )}
            />
          </Link>
          <Link
            to="/explore"
            className={tw(
              "relative flex size-9 items-center justify-center rounded-full",
              isExplorePage && "bg-[#f5f5f5] shadow-inner"
            )}
          >
            {isExplorePage ? (
              <motion.span
                key="explore-indicator"
                layoutId="page-switcher"
                transition={{
                  type: "spring",
                  duration: 0.2,
                  bounce: 0
                }}
                className="absolute inset-0 rounded-full bg-[#f5f5f5]"
              />
            ) : null}
            <SparklesIcon
              className={tw(
                "relative size-4",
                !isExplorePage && "text-neutral-400"
              )}
            />
          </Link>
        </div>
        <Link to="/imagine">
          <Button size="icon">
            <PlusIcon className="size-4" />
          </Button>
        </Link>
      </div>
    </div>
  );
};
