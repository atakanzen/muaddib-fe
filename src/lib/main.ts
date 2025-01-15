import { AuthResponse } from "../types/auth";
import { ErrorResponse } from "../types/shared";
import { capitalize } from "../utils/capitalize";
import { isStringArray } from "../utils/type-guards";

export const authenticate = async (
  endpoint: string,
  body: Record<string, any>
): Promise<string> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/${endpoint}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    }
  );

  if (!response.ok) {
    const { message }: ErrorResponse = await response.json();

    if (isStringArray(message)) {
      throw new Error(capitalize(message[0]));
    } else {
      throw new Error(capitalize(message));
    }
  }

  const { bearer }: AuthResponse = await response.json();
  return bearer;
};
