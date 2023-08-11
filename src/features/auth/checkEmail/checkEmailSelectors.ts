import { RootState } from "app/store";

export const email_Selector = (state: RootState) => state.auth.email;
