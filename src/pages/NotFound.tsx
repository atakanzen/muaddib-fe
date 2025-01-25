import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const NotFound = () => {
  return (
    <div className="h-full flex flex-col items-center justify-center gap-4">
      <h1 className="text-5xl font-bold">404 - Page Not Found</h1>
      <p className="text-xl">
        Sorry, the page you are looking for could not be found.
      </p>
      <Button>
        <Link to="/">Take Me Home</Link>
      </Button>
    </div>
  );
};

export default NotFound;
