import { ChangeEvent, useCallback } from "react";
import { TChanceEdge } from "../edges/chance-edge";
import { useSourceNodeID } from "../hooks/useParentNode";
import {
  changeProbabilityForChanceEdge,
  selectEdgeByID,
} from "../state/editor/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";

interface ChanceProbabilityProps {
  edgeID: string;
}

const ChanceProbabilityInput = ({ edgeID }: ChanceProbabilityProps) => {
  const dispatch = useAppDispatch();

  const sourceNodeID = useSourceNodeID(edgeID) ?? "";
  const edge: TChanceEdge | undefined = useAppSelector((state) =>
    selectEdgeByID(state, edgeID)
  );

  const handleOnChangeProbabilityInput = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(
        changeProbabilityForChanceEdge({
          edgeID,
          probability: Number(e.target.value),
          sourceNodeID,
        })
      );
    },
    [dispatch, edgeID, sourceNodeID]
  );
  const probability = edge?.data.probability ?? 0;

  return (
    <div className="absolute text-xss w-16 pointer-events-auto">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  p-1 bg-white border border-gray-300 rounded"
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
