import { Outlet } from "react-router-dom";
import Navigation from "./Navigation";

export default function Layout() {
  return (
    <main className="w-screen h-screen">
      <Outlet />
      <Navigation />
    </main>
  );
}
