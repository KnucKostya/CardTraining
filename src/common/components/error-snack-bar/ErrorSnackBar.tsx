import React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { appActions } from "app/appSlice";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { useAppSelector } from "common/hooks/useAppSelector";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export function ErrorSnackbar() {
  const dispatch = useAppDispatch();
  const error = useAppSelector((state) => state.app.error);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      dispatch(appActions.setError({ error: null }));
      return;
    }
    dispatch(appActions.setError({ error: null }));
  };
  return (
    <Snackbar open={error !== null} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
        {error} 😠
      </Alert>
    </Snackbar>
  );
}
