import { createBrowserRouter } from "react-router";
import { Container } from "./components/layout/container";
import { Home } from "./pages";
import { Imagine } from "./pages/imagine";
import { Profile } from "./pages/profile";

export const router = createBrowserRouter([
  {
    Component: Container,
    children: [
      {
        path: "/imagine",
        Component: Imagine
      },
      {
        path: "/",
        Component: Home
      },
      {
        path: "/u/:username",
        Component: Profile
      }
    ]
  }
]);
