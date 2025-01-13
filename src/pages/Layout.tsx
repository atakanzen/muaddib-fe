import { Outlet } from "react-router";
import Navbar from "../components/shared/navbar";

const Layout = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
