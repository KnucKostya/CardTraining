import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import { appActions } from "app/appSlice";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { app_Error_Selector } from "common/components/globalError/globalErrorSelectors";

const GlobalError = () => {
  const error = useAppSelector(app_Error_Selector);
  const dispatch = useAppDispatch();

  if (error !== null) {
    toast.error(error);
  }

  useEffect(() => {
    if (error !== null) {
      setTimeout(() => {
        dispatch(appActions.setError({ error: null }));
      }, 1000);
    }
  }, [error]);

  return (
    <div>
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
};

export default GlobalError;
