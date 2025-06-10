import { Header } from "./header";

export const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="mx-auto flex min-h-screen w-[700px] flex-col border-neutral-200 border-x">
      <Header />
      {children}
    </div>
  );
};
