import React, { useEffect } from "react";
import { useAppDispatch } from "../../common/hooks/useAppDispatch";
import s from "./cards.module.scss";
import { SuperButton } from "../../common/components/super-button/SuperButton";
import { cardsThunks } from "./cardsSlice";

export const Cards = () => {
  // const loading = useAppSelector((state) => state.app.isLoading);
  const dispatch = useAppDispatch();

  // console.log(dispatch(cardsThunks.getCards));

  useEffect(() => {
    setTimeout(() => {
      dispatch(cardsThunks.getCards());
    }, 1000);
  }, [dispatch]);

  return (
    <div className={s.packContainer}>
      <div className={s.insideContainer}>
        <h2 className={s.packName}>Pack Name</h2>
        {/*сделать корректно раотающую рамку для инпута!!!!!!!!!!!!!!!*/}
        <input placeholder="Search..."></input>
        <span>
          <SuperButton name={"Add New Card"} color={"secondary"} />
        </span>
        <div className={s.cardsContainer}>
          <div className={s.paragraphs}>
            <span className={s.questionParagraph}>Question</span>
            <span className={s.answerParagraph}>Answer</span>
            <span className={s.updatedParagraph}>Updated</span>
            <span className={s.gradeParagraph}>Grade</span>
            <span className={s.actionsParagraph}>Actions</span>
          </div>
          <div className={s.paragraphInfo}>
            <span className={s.questionPart}>question</span>
            <span className={s.answerPart}>answer</span>
            <span className={s.updatedPart}>06.06.2023</span>
            <span className={s.gradePart}>5</span>
            <span className={s.actionsPart}>
              <div>
                <SuperButton name={"delete"} color={"error"} width={"10px"} height={"20px"} />
              </div>
              <div>
                <SuperButton name={"edit"} color={"primary"} width={"10px"} height={"20px"} />
              </div>
            </span>
          </div>
          <div className={s.paragraphInfo}>
            <span className={s.questionPart}>question</span>
            <span className={s.answerPart}>answer</span>
            <span className={s.updatedPart}>06.06.2023</span>
            <span className={s.gradePart}>4</span>
            <span className={s.actionsPart}>
              <div>
                <SuperButton name={"delete"} color={"error"} width={"10px"} height={"20px"} />
              </div>
              <div>
                <SuperButton name={"edit"} color={"primary"} width={"10px"} height={"20px"} />
              </div>
            </span>
          </div>
        </div>

        <div className={s.paginationContainer}>
          -----------------pagination for Valentin----------------
        </div>
      </div>
      {/*<div className={s.firstContainer}>*/}
      {/*  <div className={s.questionParagraph}>*/}
      {/*    Question*/}
      {/*    <div className={s.question}>question</div>*/}
      {/*    <div className={s.question}>question.........</div>*/}
      {/*  </div>*/}
      {/*  /!*сделать перенос текста если больше 15 символов !!!!!!!!!!!!!!!!!*!/*/}
      {/*  <div className={s.answerParagraph}>*/}
      {/*    Answer*/}
      {/*    <div className={s.answer}>answer</div>*/}
      {/*    <div className={s.answer}>answer....................</div>*/}
      {/*  </div>*/}
      {/*</div>*/}

      {/*<div className={s.secondContainer}>*/}
      {/*  <div className={s.updatedParagraph}>*/}
      {/*    Updated*/}
      {/*    <div className={s.updated}>*/}
      {/*      <div>update</div>*/}
      {/*      <div>update</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*  <div className={s.gradeParagraph}>*/}
      {/*    Grade*/}
      {/*    <div className={s.grage}>*/}
      {/*      <div>grade</div>*/}
      {/*      <div>grade</div>*/}
      {/*    </div>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
