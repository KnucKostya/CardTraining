import { Dispatch } from "redux";
import axios, { AxiosError } from "axios";

// export const errorUtils = (e: Error | AxiosError<{ error: string }>, dispatch: Dispatch<any>) => {

export function errorUtils(e: AxiosError<{ error: string }>) {
  if (e && e.response && e.response.data && e.response.data.error) {
    return e.response.data.error;
  } else return "Неизвестная ошибка";
}

// https://github.com/axios/axios/issues/3612
// 1. then/catch
// 1 ver
// const deletePackTC1 =
//   (packId: string): AppThunk =>
//   (dispatch) => {
//     packsAPI
//       .deletePack(packId)
//       .then(() => {
//         // code
//       })
//       .catch((err: AxiosError<{ error: string }>) => {
//         const error = err.response ? err.response.data.error : err.message;
//         console.log("error: ", error);
//       });
//   };
// // 2 ver
// const deletePackTC2 =
//   (packId: string): AppThunk =>
//   (dispatch) => {
//     packsAPI
//       .deletePack(packId)
//       .then(() => {
//         // code
//       })
//       .catch((err: AxiosError) => {
//         const error = err.response
//           ? (err.response.data as { error: string }).error
//           : err.message;
//         console.log("error: ", error);
//       });
//   };
//
// // 2. try/catch
// // 1 ver
// export const deletePackTC3 =
//   (packId: string): AppThunk =>
//   async (dispatch) => {
//     try {
//       // code
//     } catch (e) {
//       const err = e as Error | AxiosError<{ error: string }>;
//       if (axios.isAxiosError(err)) {
//         const error = err.response?.data ? err.response.data.error : err.message;
//         dispatch(setAppErrorAC(error));
//       } else {
//         dispatch(setAppErrorAC(`Native error ${err.message}`));
//       }
//     }
//   };
//
// // 2 ver
// export const deletePackTC4 =
//   (packId: string): AppThunk =>
//   async (dispatch) => {
//     try {
//       // code
//     } catch (e) {
//       const err = e as Error | AxiosError;
//       if (axios.isAxiosError(err)) {
//         const error = err.response?.data
//           ? (err.response.data as { error: string }).error
//           : err.message;
//         dispatch(setAppErrorAC(error));
//       } else {
//         dispatch(setAppErrorAC(`Native error ${err.message}`));
//       }
//     }
//   };
