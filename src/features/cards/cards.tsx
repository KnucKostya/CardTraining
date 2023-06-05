import React, { useEffect } from "react";
import { appActions } from "../../app/appSlice";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import { useAppSelector } from "../../common/hooks/useAppSelector";
import s from "./cards.module.scss";

export const Cards = () => {
  const loading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <h2 className={s.packName}>Pack Name</h2>
        {/*сделать корректно раотающую рамку для инпута!!!!!!!!!!!!!!!*/}
        <input placeholder="Search..."></input>
        <div className={s.cardsContainer}>
          <div className={s.firstContainer}>
            <div className={s.questionParagraph}>
              Question
              <div className={s.question}>question</div>
              <div className={s.question}>question.........</div>
            </div>
            {/*сделать перенос текста если больше 15 символов !!!!!!!!!!!!!!!!!*/}
            <div className={s.answerParagraph}>
              Answer
              <div className={s.answer}>answer</div>
              <div className={s.answer}>answer....................</div>
            </div>
          </div>

          <div className={s.secondContainer}>
            <div className={s.updatedParagraph}>
              Updated
              <div className={s.updated}>
                <div>update</div>
                <div>update</div>
              </div>
            </div>
            <div className={s.gradeParagraph}>
              Grade
              <div className={s.grage}>
                <div>grade</div>
                <div>grade</div>
              </div>
            </div>
          </div>
        </div>
        <div className={s.paginationContainer}>
          -----------------pagination for Valentin----------------
        </div>
      </div>
    </div>
  );
};
