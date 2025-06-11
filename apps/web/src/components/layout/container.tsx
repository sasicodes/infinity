import { Outlet, useLocation } from "react-router";
import { tw } from "../ui/tw";
import { Header } from "./header";
import { Sidebar } from "./sidebar";

export const Container = () => {
  const location = useLocation();
  const isCanvasPage = location.pathname.includes("/imagine");

  return (
    <div
      className={tw(
        "mx-auto grid min-h-screen justify-center",
        isCanvasPage ? "grid-cols-1" : "grid-cols-[70px_700px]"
      )}
    >
      <div
        className={tw(
          isCanvasPage
            ? "absolute left-0 z-10 mt-16 h-full"
            : "sticky top-0 bottom-0 col-span-1 h-screen"
        )}
      >
        <Sidebar />
      </div>
      <div className="col-span-1 border-neutral-200 border-x bg-neutral-50">
        <Header />
        <Outlet />
      </div>
    </div>
  );
};
