import s from "./Bear.module.scss";
import * as React from "react";

export const BearLoader = () => {
  return (
    <div className={s.bear}>
      <div className={s.loader}></div>
    </div>
  );
};
