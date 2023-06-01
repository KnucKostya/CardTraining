import React from "react";
import { useAppDispatch, useAppSelector } from "common/hooks/hooks";
import s from "features/Header/Header.module.scss";


export const Header = () => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector<boolean>((state) => state.app.isLoading);

  return (
    <>
      <div className={s.header} id="header">
        <div className={`container ${s.headerContainer}`}>
          <div>
            <h1>Cards</h1>
          </div>
          <div className={s.actions}>
            <button> to smth</button>
            <span>nick</span>
            <img src="src/features/Header#" alt="logo" />
          </div>
        </div>
        {/*{isLoading && <ProgressBar />}*/}
      </div>
    </>
  );
};
