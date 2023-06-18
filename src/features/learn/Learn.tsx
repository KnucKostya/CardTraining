import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useActions } from "common/hooks/useActions";
import { packs_Selector } from "features/packs/packsSelector";
import s from "features/learn/Learn.module.scss";
import { SuperButton } from "common/components/super-button/SuperButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { RouteNames } from "app/routes";
import GradeTwoToneIcon from "@mui/icons-material/GradeTwoTone";
import { CardType } from "features/cards/cardsApi";

const grades = [
  { answer: "Didn't know", id: 1 },
  { answer: "Forgot", id: 2 },
  { answer: "Knew something", id: 3 },
  { answer: "Mostly knew the answer", id: 4 },
  { answer: "Knew the answer", id: 5 },
];
export const Learn = () => {
  const { id: cardsPack_id } = useParams();
  const packs = useAppSelector(packs_Selector);
  // const  cards  = useAppSelector(cards_Selector)
  // const { getCards, updateGrade, getPacks, setIsLoading } = useActions({
  //   ...cardsThunks,
  //   ...packsThunks,
  //   ...cardsActions,
  // })
  const [card, setCard] = useState<CardType>();
  const [first, setFirst] = useState<boolean>(true);
  const [grade, setGrade] = useState<number>(0);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const [answer, setAnswer] = React.useState("female");

  const pack = packs.find((p) => p._id === cardsPack_id);
  const onChangeGrade = (value: string) => {
    switch (value) {
      case "Didn't answer, 1/5": {
        setGrade(1);
        break;
      }
      case "Wasn't sure, 2/5": {
        setGrade(2);
        break;
      }
      case "Knew something, 3/5": {
        setGrade(3);
        break;
      }
      case "Mostly knew the answer, 4/5": {
        setGrade(4);
        break;
      }
      case "Knew the answer, 5/5": {
        setGrade(5);
        break;
      }
      default:
        setGrade(0);
    }
  };
  const answerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer((event.target as HTMLInputElement).value);
  };

  return (
    <div className={s.learn}>
      <div className={`container ${s.learnContainer}`}>
        <SuperButton
          name={"Back to Packs"}
          variant={"text"}
          startIcon={<ArrowBackIcon />}
          redirectPath={RouteNames.PACKS}
        />
        <div className={s.learnBlock}>
          <h2 className={s.title}>Learn : Pack name</h2> {/*TODO hardcode*/}
          <div className={s.learnCard}>
            <div className={s.question}>
              <b>Question</b>: Lorem ipsum dolor sit amet! {/*TODO hardcode*/}
            </div>
            <div className={s.attempts}>Количество попыток ответов на вопрос: 10</div> {/*TODO hardcode*/}
            <div className={s.answer}>
              <b>Answer</b>: answer content here {/*TODO hardcode*/}
            </div>
            {showAnswer && (
              <FormControl sx={{ marginBottom: "42px" }}>
                <FormLabel>Rate yourself:</FormLabel>
                <RadioGroup value={answer} onChange={answerHandler}>
                  {grades.map((grade) => (
                    <div className={s.answerVariant} key={grade.id}>
                      <FormControlLabel value={grade.answer} control={<Radio />} label={grade.answer} />
                      {Array.from({ length: grade.id }, (_, index) => (
                        <GradeTwoToneIcon key={index} fontSize={"small"} />
                      ))}
                    </div>
                  ))}
                </RadioGroup>
              </FormControl>
            )}
            {!showAnswer && (
              <SuperButton
                name={"Show answer"}
                variant={"contained"}
                borderRadius={"30px"}
                width={"360px"}
                onClickCallBack={() => setShowAnswer(!showAnswer)}
              />
            )}
            {showAnswer && (
              <SuperButton
                name={"Next"}
                variant={"contained"}
                borderRadius={"30px"}
                width={"360px"}
                // onClickCallBack={setNextCard}
                // TODO
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
