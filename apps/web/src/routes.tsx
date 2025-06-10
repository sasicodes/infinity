import { Navigate, Outlet, createBrowserRouter } from "react-router";
import { Home } from "./pages";
import { Imagine } from "./pages/imagine";
import { Profile } from "./pages/profile";

const Layout = () => {
  const isAuthenticated = true;

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="flex min-h-screen">
      <Outlet />
    </div>
  );
};

export const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      {
        path: "/",
        Component: Home
      },
      {
        path: "/imagine",
        Component: Imagine
      },
      {
        path: "/u/:username",
        Component: Profile
      }
    ]
  }
]);
