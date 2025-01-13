import { Link } from "react-router";
import Navbar from "../components/shared/navbar";

const NotFound = () => {
  return (
    <div className="w-screen h-screen">
      <Navbar />
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
        <p className="text-xl">
          Sorry, the page you are looking for could not be found.
        </p>
        <Link className="px-4 py-2 bg-amber-500 rounded cursor-pointer" to="/">
          Take me Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
