import { createBrowserRouter } from "react-router";
import { Container } from "./components/layout/container";
import { Home } from "./pages";
import { Explore } from "./pages/explore";
import { Imagine } from "./pages/imagine";
import { Profile } from "./pages/profile";
import { SignIn } from "./pages/sign-in";

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
        path: "/explore",
        Component: Explore
      },
      {
        path: "/u/:username",
        Component: Profile
      }
    ]
  },
  {
    path: "/sign-in",
    Component: SignIn
  }
]);
