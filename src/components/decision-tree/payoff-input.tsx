import { ActionCreatorWithPayload } from "@reduxjs/toolkit";
import classNames from "classnames";
import { ChangeEvent, useCallback, useState } from "react";
import { useAppDispatch } from "../../state/hooks";

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
    Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(payoff)
  );

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const rawValue = e.target.value;

      // Remove invalid characters but keep valid input patterns
      const sanitizedValue = rawValue
        .replace(/[^0-9.,-]/g, "") // Allow numbers, commas, periods, and "-"
        .replace(/(?!^)-/g, "") // Allow a single "-" at the start
        .replace(/,/g, ""); // Temporarily strip commas to avoid conflicts

      // Dispatch the numeric value if valid
      const numericValue = Number(sanitizedValue);
      if (
        !isNaN(numericValue) ||
        sanitizedValue === "-" ||
        sanitizedValue === ""
      ) {
        setInputValue(rawValue);

        if (sanitizedValue !== "-" && sanitizedValue !== "") {
          dispatch(action({ id, value: numericValue }));
        }
      }
    },
    [action, dispatch, id]
  );

  const handleOnBlur = useCallback(() => {
    const sanitizedValue = inputValue.replace(/,/g, ""); // Remove commas for parsing
    const numericValue = Number(sanitizedValue);

    if (!isNaN(numericValue)) {
      // Format with US number formatting
      const formattedValue = Intl.NumberFormat("en-US", {
        maximumFractionDigits: 2,
      }).format(numericValue);

      setInputValue(formattedValue);
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
