import { ChangeEvent, useCallback, useMemo } from "react";
import { TChanceToChanceEdge } from "../../edges/chance-to-chance-edge";
import { TChanceToEndpointEdge } from "../../edges/chance-to-endpoint-edge";
import { useSourceNodeID } from "../../hooks/useParentNode";
import {
  changeProbabilityForChanceEdge,
  selectEdgeByID,
} from "../../state/editor/store";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { validateProbability } from "../../utils/validation";

interface ChanceProbabilityProps {
  edgeID: string;
}

const ChanceProbabilityInput = ({ edgeID }: ChanceProbabilityProps) => {
  const dispatch = useAppDispatch();

  const sourceNodeID = useSourceNodeID(edgeID) ?? "";
  const edge: TChanceToEndpointEdge | TChanceToChanceEdge | undefined =
    useAppSelector((state) =>
      selectEdgeByID<TChanceToEndpointEdge | TChanceToChanceEdge>(state, edgeID)
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

  const probability = useMemo(
    () => edge?.data.probability ?? 0,
    [edge?.data.probability]
  );

  return (
    <div className="absolute text-xss w-16 pointer-events-auto">
      <input
        type="number"
        className="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none w-full  p-1 bg-white border border-gray-300 rounded"
        value={probability}
        min={0}
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
