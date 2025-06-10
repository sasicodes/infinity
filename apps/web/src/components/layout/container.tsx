import { Outlet, useLocation } from "react-router";
import { tw } from "../ui/tw";
import { Header } from "./header";

export const Container = () => {
  const location = useLocation();
  const isCanvasPage = location.pathname.includes("/imagine");

  return (
    <div
      className={tw(
        "mx-auto flex min-h-screen flex-col border-neutral-200 border-x",
        isCanvasPage ? "w-full" : "w-[700px]"
      )}
    >
      <Header />
      <Outlet />
    </div>
  );
};
