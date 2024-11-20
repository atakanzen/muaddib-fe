import { ChangeEvent, useCallback } from "react";
import { TChanceEdge } from "../edges/chance-edge";
import { useSourceNodeID } from "../hooks/useParentNode";
import {
  changeProbabilityForChanceEdge,
  selectEdgeByID,
} from "../state/editor/store";
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { validateProbability } from "../utils/validation";

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
      let numericValue = Number(e.target.value);
      if (validateProbability(numericValue)) {
        numericValue = parseFloat(numericValue.toFixed(2));
        dispatch(
          changeProbabilityForChanceEdge({
            edgeID,
            probability: numericValue,
            sourceNodeID,
          })
        );
      }
    },
    [dispatch, edgeID, sourceNodeID]
  );
  const probability = edge?.data.probability ?? 0;

  const handleOnBlur = useCallback(() => {
    // Ensure the displayed value stays within bounds on blur
    if (probability < 0 || probability > 100) {
      const clampedValue = Math.max(0, Math.min(probability, 100));
      dispatch(
        changeProbabilityForChanceEdge({
          edgeID,
          probability: clampedValue,
          sourceNodeID,
        })
      );
    }
  }, [dispatch, edgeID, probability, sourceNodeID]);

  return (
    <div className="absolute text-xss w-16 pointer-events-auto">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  p-1 bg-white border border-gray-300 rounded"
        value={probability}
        min={0}
        max={100}
        onChange={handleOnChangeProbabilityInput}
        onBlur={handleOnBlur}
      />
      <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 font-bold">
        %
      </span>
    </div>
  );
};

export default ChanceProbabilityInput;
