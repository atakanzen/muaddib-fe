import classNames from "classnames";
import { Link, NavLink } from "react-router";

const links = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/editor",
    title: "Editor",
  },
  {
    url: "/about-us",
    title: "About Us",
  },
];

const Navbar = () => {
  return (
    <div className="absolute z-50 top-0 left-0 w-full h-20 bg-slate-50 border-b-4 border-black flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-2">
        <h1 className="font-serif font-extrabold text-2xl leading-none">
          Muad'dib
        </h1>
        <p className="text-gray-400">subject to change</p>
      </div>
      <div className="text-xl">
        <nav className="flex gap-2">
          {links.map((li) => (
            <NavLink
              key={li.url}
              to={li.url}
              className={({ isActive }) =>
                classNames("cursor-pointer", {
                  "underline-offset-2 underline decoration-amber-500 decoration-2":
                    isActive,
                })
              }
            >
              {li.title}
            </NavLink>
          ))}
        </nav>
      </div>
      <div>
        <Link
          className="bg-amber-500 border border-black rounded cursor-pointer px-4 py-2"
          to="/auth"
        >
          Sign Out
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
