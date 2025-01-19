import classNames from "classnames";
import { jwtDecode } from "jwt-decode";
import { MouseEventHandler, useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useAuth } from "../../hooks/useAuth";
import { Button } from "../ui/button";

const links = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/about-us",
    title: "About Us",
  },
];

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [isTooltipVisible, setTooltipVisible] = useState(false);

  const handleSignOut: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    logout();
    navigate("/");
  };

  // Decode JWT to get the user's name
  const getUsername = (): string | null => {
    const token = sessionStorage.getItem("authToken");
    if (!token) return null;

    try {
      const decoded: any = jwtDecode(token);
      return decoded?.username || "";
    } catch (error) {
      console.error("Error decoding JWT:", error);
      return null;
    }
  };

  const username = getUsername();
  const userInitial = username ? username.charAt(0).toUpperCase() : "";

  return (
    <div className="absolute z-50 top-0 left-0 w-full h-20 bg-white border-b-4 border-black flex items-center justify-between p-4">
      <div className="flex items-center justify-center gap-2">
        <h1 className="font-serif font-extrabold text-2xl ">Muad'dib</h1>
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
      <div className="flex items-center gap-4">
        <Button variant="outline" onClick={handleSignOut}>
          Sign Out
        </Button>
        {username && (
          <div
            className="relative group"
            onMouseEnter={() => setTooltipVisible(true)}
            onMouseLeave={() => setTooltipVisible(false)}
          >
            <div className="w-10 h-10 bg-amber-500 text-white rounded-full flex items-center justify-center font-bold select-none">
              {userInitial}
            </div>
            {isTooltipVisible && (
              <div className="absolute top-12 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-sm rounded-md px-2 py-1">
                {username}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
