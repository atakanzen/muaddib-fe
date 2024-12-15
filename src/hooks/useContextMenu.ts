import { useCallback, useState } from "react";

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

  const showMenu = useCallback((x: number, y: number) => {
    setMenuPosition({ x, y });
    setMenuVisible(true);
  }, []);

  const hideMenu = useCallback(() => {
    setMenuVisible(false);
  }, []);

  return { menuVisible, menuPosition, showMenu, hideMenu };
};

export default useContextMenu;
