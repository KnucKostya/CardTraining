import { RootState } from "./store";

export const isLoading_Selector=(state: RootState)=> state.app.isLoading
export const error_Selector=(state: RootState)=> state.app.error