import { isAxiosError } from "axios";

export function getErrorMessage(error: unknown): null | string {
  if (isAxiosError(error)) {
    if (error?.response?.status === 400 && error?.request.responseURL.endsWith("/login"))
      return null;
    return error?.response?.data?.error ?? error.message;
  } else if (error instanceof Error) {
    return `Native error: ${error.message}`;
  } else return JSON.stringify(error);
}
