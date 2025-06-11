import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useLocation } from "react-router";
import { Button } from "../ui/button";
import { UserMenu } from "./user-menu";

export const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const location = useLocation();
  const { setShowAuthFlow } = useDynamicContext();

  return (
    <div className="sticky top-0 z-10 flex h-[var(--header-height)] items-center justify-between border-neutral-200 border-b bg-[#f5f5f550] px-4 py-3 backdrop-blur-2xl">
      <span className="font-medium text-neutral-500 text-sm">
        {location.pathname || "home"}
      </span>
      {isLoggedIn ? (
        <UserMenu />
      ) : (
        <Button onClick={() => setShowAuthFlow(true)}>Sign in</Button>
      )}
    </div>
  );
};
