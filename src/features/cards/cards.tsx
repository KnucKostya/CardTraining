import React, { useEffect } from "react";
import { appActions } from "../../app/appSlice";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";

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

export default Cards;
