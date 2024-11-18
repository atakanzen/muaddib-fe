import {
  BaseEdge,
  Edge,
  EdgeLabelRenderer,
  EdgeProps,
  getSimpleBezierPath,
} from "@xyflow/react";
import classNames from "classnames";
import { ChangeEvent, useCallback, useState } from "react";
import { changeInputForValueEdge } from "../state/editor/store";
import { useAppDispatch } from "../state/hooks";

type EdgeValueLabelType = "value" | "label";

interface EdgeValueLabelProps {
  id: string;
  transform: string;
  type: EdgeValueLabelType;
  value: number;
  valueType?: ValueType;
}

const EdgeValueLabel = ({
  id,
  transform,
  value,
  valueType,
}: EdgeValueLabelProps) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(
    Intl.NumberFormat("en-US").format(value)
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      // Remove formatting (commas) and handle empty inputs
      const numericValue = Number(rawValue.replace(/,/g, ""));
      if (!isNaN(numericValue) || rawValue === "") {
        setInputValue(rawValue);

        // Dispatch only valid numbers
        if (rawValue !== "") {
          dispatch(
            changeInputForValueEdge({
              id,
              value: numericValue,
            })
          );
        }
      }
    },
    [dispatch, id]
  );

  const handleOnBlur = useCallback(() => {
    const numericValue = Number(inputValue.replace(/,/g, ""));
    if (!isNaN(numericValue)) {
      setInputValue(Intl.NumberFormat("en-US").format(numericValue));
    }
  }, [inputValue]);

  return (
    <div
      className={classNames(
        "w-fit text-xss text-center absolute rounded p-1 pointer-events-auto nodrag nopan",
        {
          "bg-green-500 text-white  p-1": valueType === "profit",
          "bg-red-500 text-white": valueType === "cost",
          "bg-gray-200": !valueType,
        }
      )}
      style={{
        transform,
      }}
    >
      <span className="absolute left-2 top-1/2 transform -translate-y-1/2">
        $
      </span>
      <input
        className="pl-5 text-center w-20 bg-transparent border-none outline-none appearance-none"
        value={inputValue}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
      />
    </div>
  );
};

type ValueType = "cost" | "profit";

type ValueEdgeData = {
  value: number;
  valueType?: ValueType;
};

export type TValueEdge = Omit<Edge<ValueEdgeData, "valueEdge">, "data"> & {
  data: ValueEdgeData;
};

const ValueEdge = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  data: { value, valueType },
}: EdgeProps<TValueEdge>) => {
  const [edgePath] = getSimpleBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
  });

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <EdgeValueLabel
          id={id}
          type="value"
          value={value}
          valueType={valueType}
          transform={`translate(-120%, -50%) translate(${targetX}px, ${targetY}px)`}
        />
      </EdgeLabelRenderer>
    </>
  );
};

export default ValueEdge;
