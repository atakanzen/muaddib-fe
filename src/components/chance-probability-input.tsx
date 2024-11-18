import { ChangeEvent, useCallback } from "react";
// import { changeProbabilityForChanceNode } from "../state/editor/store";

interface ChanceProbabilityProps {
  probability: number;
  nodeID: string;
}

const ChanceProbabilityInput = ({
  probability,
}: // nodeID,
ChanceProbabilityProps) => {
  // const dispatch = useAppDispatch();

  // const parentNodeID = useParentNodeID(nodeID) ?? "";

  const handleOnChangeProbabilityInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      console.log(e.target.value);
      // dispatch(
      //   changeProbabilityForChanceNode({
      //     nodeID,
      //     probability: Number(e.target.value),
      //     parentNodeID: parentNodeID,
      //   })
      // );
    },
    []
  );

  return (
    <div className="absolute text-xss w-12 pointer-events-auto">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  py-2 px-3 bg-white border border-gray-300 rounded "
        value={probability}
        max={100}
        onChange={handleOnChangeProbabilityInput}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
        %
      </span>
    </div>
  );
};

export default ChanceProbabilityInput;
