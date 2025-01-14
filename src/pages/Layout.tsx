import { Navigate, Outlet, useLocation } from "react-router";
import Navbar from "../components/shared/navbar";
import { useAuth } from "../hooks/useAuth";

const Layout = () => {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
