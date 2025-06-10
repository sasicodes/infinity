import { Feed } from "../components/home/feed";
import { Header } from "../components/layout/header";

export const Home = () => {
  return (
    <div className="mx-auto min-h-screen min-w-2xl border-neutral-200 border-x">
      <Header />
      <Feed />
    </div>
  );
};
