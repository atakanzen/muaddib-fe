import classNames from "classnames";
import { useState } from "react";
import ArrowDownIcon from "../../icons/arrow-down";

const NodeMenu = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <div
      className={classNames(
        "flex flex-col items-center  overflow-hidden bg-amber-500 cursor-pointer absolute z-50 ml-4 mt-24 transition-all duration-500  w-40",
        {
          "h-10": !isOpen,
          "h-1/4": isOpen,
        }
      )}
    >
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-end p-1.5"
      >
        <ArrowDownIcon
          className={classNames("translation-all duration-500", {
            "rotate-180": isOpen,
          })}
          height={30}
          width={30}
        />
      </div>
      <div
        className={classNames(
          "translation-all duration-500 overflow-hidden w-full",
          {
            "h-0": !isOpen,
            "h-full": isOpen,
          }
        )}
      >
        List
      </div>
    </div>
  );
};

export default NodeMenu;
