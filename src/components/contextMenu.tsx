import { useEffect, useRef } from "react";
import useContextMenu, { MenuPosition } from "../hooks/useContextMenu";

interface ContextMenuProps {
  menuPosition: MenuPosition;
  menuVisible: boolean;
}

const ContextMenu = ({ menuPosition, menuVisible }: ContextMenuProps) => {
  const { hideMenu } = useContextMenu();
  const menuRef = useRef<HTMLDivElement | null>(null);

  // TODO: This is not working yet.
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      e.preventDefault();
      if (menuRef.current) {
        console.log("ICERDEYIm");
        hideMenu();
      }
    };

    console.log("menuRef.current: ", menuRef.current);
    console.log("menuVisible: ", menuVisible);

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [hideMenu, menuVisible]);

  return (
    <div
      ref={menuRef}
      className="absolute h-64 w-44 bg-white border rounded z-50 p-2 shadow-funky"
      style={{
        top: `${menuPosition.y}px`,
        left: `${menuPosition.x}px`,
      }}
    >
      <span className="font-bold">Context Menu</span>
      <ul className="flex flex-col gap-2 mt-4 items-start justify-center">
        <li className="border-b cursor-pointer">Decision Node</li>
        <li className="border-b cursor-pointer">Chance Node</li>
        <li className="border-b cursor-pointer">Endpoint Node</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
