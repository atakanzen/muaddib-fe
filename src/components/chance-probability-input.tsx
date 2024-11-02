import { ChangeEvent, useCallback } from "react";
import { useParentNodeID } from "../hooks/useParentNode";
import { changeProbabilityForChanceNode } from "../state/editor/store";
import { useAppDispatch } from "../state/hooks";

interface ChanceProbabilityProps {
  probability: number;
  nodeID: string;
}

const ChanceProbabilityInput = ({
  probability,
  nodeID,
}: ChanceProbabilityProps) => {
  const dispatch = useAppDispatch();

  const parentNodeID = useParentNodeID(nodeID) ?? "";

  const handleOnChanceProbabilityInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeProbabilityForChanceNode({
          nodeID,
          probability: Number(e.target.value),
          parentNodeID: parentNodeID,
        })
      );
    },
    [dispatch, nodeID, parentNodeID]
  );

  return (
    <div className="relative max-w-20">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  py-2 px-3 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
        value={probability}
        max={100}
        onChange={handleOnChanceProbabilityInput}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
        %
      </span>
    </div>
  );
};

export default ChanceProbabilityInput;
