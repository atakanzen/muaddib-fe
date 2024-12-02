import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import classNames from "classnames";
import { ChangeEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../state/hooks";

export type PayoffType = "cost" | "profit";

interface PayoffInputProps {
  id: string;
  transform: string;
  payoff: number;
  payoffType?: PayoffType;
  action: ActionCreatorWithPayload<{ id: string; value: number }>;
}

export const PayoffInput = ({
  id,
  transform,
  payoff,
  payoffType,
  action,
}: PayoffInputProps) => {
  const dispatch = useAppDispatch();

  const [inputValue, setInputValue] = useState(
    Intl.NumberFormat("en-US").format(payoff)
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
          dispatch(action({ id: id, value: numericValue }));
        }
      }
    },
    [action, dispatch, id]
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
          "bg-green-500 text-white  p-1": payoffType === "profit",
          "bg-red-500 text-white": payoffType === "cost",
          "bg-gray-200": !payoffType,
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
