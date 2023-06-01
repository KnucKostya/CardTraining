import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../common/hooks/hooks";
import { appActions } from "../../features/appSlice";

export const Cards = () => {
  const loading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsLoading({ isLoading: false }));
    }, 1000);
  }, [dispatch]);

  if (loading) {
    return <div>loading...</div>;
  }

  return <div>Cards</div>;
};
