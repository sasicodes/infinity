import { StrictMode, lazy } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { router } from "./routes";
import "./font.css";

const DynamicWagmiProvider = lazy(() =>
  import("./dynamic").then((mod) => ({ default: mod.DynamicWagmiProvider }))
);

createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <DynamicWagmiProvider>
      <RouterProvider router={router} />
    </DynamicWagmiProvider>
  </StrictMode>
);
