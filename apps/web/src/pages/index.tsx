import { Feed } from "../components/home/feed";
import { Header } from "../components/layout/header";

export const Home = () => {
  return (
    <div className="mx-auto flex min-h-screen min-w-2xl flex-col border-neutral-200 border-x">
      <Header />
      <Feed />
    </div>
  );
};
