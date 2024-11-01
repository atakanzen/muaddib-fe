import { useReactFlow } from "@xyflow/react";
import { useCallback, useRef } from "react";
import useContextMenu, { MenuPosition } from "../hooks/useContextMenu";

interface ContextMenuProps {
  menuPosition: MenuPosition;
}

const ContextMenu = ({ menuPosition }: ContextMenuProps) => {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const { addNodes } = useReactFlow();
  const { hideMenu } = useContextMenu();

  const handleDecisionNode = useCallback(
    (e: React.MouseEvent<HTMLLIElement | null>) => {
      e.preventDefault();
      hideMenu();
      addNodes({
        id: crypto.randomUUID(),
        position: { x: menuPosition.x, y: menuPosition.y },
        type: "decisionNode",
        data: {},
      });
    },
    [addNodes, hideMenu, menuPosition.x, menuPosition.y]
  );

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
        <li onClick={handleDecisionNode} className="border-b cursor-pointer">
          Decision Node
        </li>
        <li className="border-b cursor-pointer">Chance Node</li>
        <li className="border-b cursor-pointer">Endpoint Node</li>
      </ul>
    </div>
  );
};

export default ContextMenu;
