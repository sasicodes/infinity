import { createBrowserRouter, Outlet } from "react-router";
import { Home } from "./pages";
import { MousePointerClick } from "lucide-react";
import { ReactFlowProvider } from "@xyflow/react";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "./lib/idb";

const Layout = () => {
  const data = useLiveQuery(() => db.flowData.orderBy("id").last());
  const isLoading = data === undefined;
  const isStarted = data?.nodes && data.nodes.length > 0;

  return (
    <ReactFlowProvider>
      <div className="flex h-screen w-screen cursor-pointer">
        {!isLoading && !isStarted ? (
          <div className="absolute inset-0">
            <div className="flex h-full w-full flex-col items-center justify-center gap-4">
              <MousePointerClick className="size-10" strokeWidth={1.5} />
              <span>Double click anywhere to start</span>
            </div>
          </div>
        ) : null}
        <Outlet />
      </div>
    </ReactFlowProvider>
  );
};

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home
      }
    ]
  }
]);
