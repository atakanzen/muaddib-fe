import { useState } from "react";

export interface MenuPosition {
  x: number;
  y: number;
}

const useContextMenu = () => {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({
    x: 0,
    y: 0,
  });

  const showMenu = (x: number, y: number) => {
    console.log("Show menu called, menu visible before: ", menuVisible);
    setMenuPosition({ x, y });
    setMenuVisible(true);
    console.log("Show menu called, menu visible after: ", menuVisible);
  };

  const hideMenu = () => {
    setMenuVisible(false);
    console.log("HIDE MENU CALLED, menuVisible: ", menuVisible);
  };

  return { menuVisible, menuPosition, showMenu, hideMenu };
};

export default useContextMenu;
