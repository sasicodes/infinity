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
      <Button onClick={() => setShowAuthFlow(true)}>Sign in</Button>
    </div>
  );
};
