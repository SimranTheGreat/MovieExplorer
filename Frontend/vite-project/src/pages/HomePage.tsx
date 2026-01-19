import { Outlet } from "react-router-dom";
import Headerbar from "../Components/Header";
export default function HomePage() {
  return (
    <>
      <Headerbar />
      <main className="pt-32">
        <Outlet />
      </main>
    </>
  );
}
