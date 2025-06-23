import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";

export const SignIn = () => {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const { setShowAuthFlow } = useDynamicContext();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="font-medium text-lg">Login to use the app</div>
        <Button onClick={() => setShowAuthFlow(true)}>Sign in</Button>
      </div>
    </div>
  );
};
