import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <p className="text-xl">
        Sorry, the page you are looking for could not be found.
      </p>
      <Link className="px-4 py-2 bg-amber-500 rounded cursor-pointer" to="/">
        Take me Home
      </Link>
    </div>
  );
};

export default NotFound;
