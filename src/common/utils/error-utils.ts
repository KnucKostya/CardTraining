import { AxiosError } from "axios";

export function errorUtils(e: AxiosError<{ error: string }>) {
  if (e && e.response && e.response.data && e.response.data.error) {
    return e.response.data.error;
  } else return "something error occurred";
}
