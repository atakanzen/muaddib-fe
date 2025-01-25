import { ErrorResponse } from "@/types/shared";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const getErrorMessage = (error: FetchBaseQueryError | SerializedError) => {
  if ("status" in error) {
    return "error" in error
      ? { message: error.error, status: error.status }
      : {
          message: (error.data as ErrorResponse).message,
          status: error.status,
        };
  } else {
    return { message: error.message, status: undefined };
  }
};

export { getErrorMessage };
