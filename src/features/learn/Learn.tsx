import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppSelector } from "common/hooks/useAppSelector";
import { useActions } from "common/hooks/useActions";
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
import { CardType, GradeType } from "features/cards/cardsApi";
import { cards_Selector, pack_Name_Selector } from "features/cards/cardsSelectors";
import { cardsThunks } from "features/cards/cardsSlice";
import { packsThunks } from "features/packs/packsSlice";
import { getRandomCard } from "common/utils/random-card";
import { isLoading_Selector } from "app/appSelector";
import { Backdrop } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { toast } from "react-toastify";
import { AxiosError } from "axios";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";

const grades = [
  { answer: "Didn't know", id: 1 },
  { answer: "Forgot", id: 2 },
  { answer: "Knew something", id: 3 },
  { answer: "Mostly knew the answer", id: 4 },
  { answer: "Knew the answer", id: 5 },
];
export const Learn = () => {
  const { getCards, updateGrade } = useActions({ ...packsThunks, ...cardsThunks });
  const { packId } = useParams();
  const packName = useAppSelector(pack_Name_Selector);
  const cards = useAppSelector(cards_Selector);
  const isLoading = useAppSelector(isLoading_Selector);
  const [card, setCard] = useState<CardType>({
    user_id: "fake",
    _id: "fake",
    cardsPack_id: "",
    answer: "loading...",
    question: "loading...",
    answerImg: "loading...",
    questionImg: "loading...",
    grade: 0,
    shots: 0,
    created: new Date(),
    updated: new Date(),
  });
  const [first, setFirst] = useState<boolean>(true);
  const [grade, setGrade] = useState<GradeType>(0);
  const [answer, setAnswer] = useState<string>(grades[0].answer);
  const [showAnswer, setShowAnswer] = useState<boolean>(false);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleClose = () => setOpen(false);

  const redirectToPacksHandler = () => {
    navigate("/packs");
  };

  const setGradeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = (event.target as HTMLInputElement).value;
    setAnswer(value);
    switch (value) {
      case grades[0].answer: {
        setGrade(1);
        break;
      }
      case grades[1].answer: {
        setGrade(2);
        break;
      }
      case grades[2].answer: {
        setGrade(3);
        break;
      }
      case grades[3].answer: {
        setGrade(4);
        break;
      }
      case grades[4].answer: {
        setGrade(5);
        break;
      }
      default:
        setGrade(0);
    }
  };
  const setNextCard = () => {
    updateGrade({ grade, card_id: card._id })
      .then(() => toast.success(`grade updated to ${grade} stars`))
      .catch((e: AxiosError) => {
        let error = e;
        error.message
          ? toast.error(error.message)
          : toast.error("something error occurred with changing card grade");
      });
    setShowAnswer(false);

    setCard(getRandomCard(cards));
  };

  const gradeCards = card.grade;

  useEffect(() => {
    if (first) {
      getCards({ packId: packId! });
      setFirst(false);
    }
    if (cards?.length > 0) {
      setCard(getRandomCard(cards));
    }
    if (gradeCards === 5) {
      setOpen(true);
    }
  }, [first, cards, packId, gradeCards]);

  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
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
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography id="modal-modal-title" variant="h6" component="h2">
                You've already learned all cards at 5 stars rating
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Do you want learn another pack?
              </Typography>
              <div>
                <SuperButton name={"Yes"} onClickCallBack={redirectToPacksHandler} />
              </div>
              <div>
                <SuperButton name={"No"} onClickCallBack={handleClose} />
              </div>
            </Box>
          </Modal>
          <h2 className={s.title}>Learn: "{packName}"</h2>
          <div className={s.learnCard}>
            <div className={s.question}>
              <b>Question:</b>
              {card?.question !== ("no question" || card.grade !== 5) ? (
                card.question
              ) : (
                <img src={card.questionImg} className={s.photo} alt="question Img" />
              )}
            </div>
            {showAnswer && (
              <>
                <div className={s.answer}>
                  <b>Answer:</b>{" "}
                  {card?.answer !== ("no answer" || card.grade !== 5) ? (
                    card.answer
                  ) : (
                    <img src={card.answerImg} className={s.photo} alt="answer Img" />
                  )}
                </div>
                <FormControl sx={{ marginBottom: "42px" }}>
                  <FormLabel>Rate yourself:</FormLabel>
                  <RadioGroup value={answer} onChange={setGradeHandler}>
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
              </>
            )}
            {!showAnswer && (
              <SuperButton
                name={"Show answer"}
                variant={"contained"}
                borderRadius={"30px"}
                width={"360px"}
                onClickCallBack={() => setShowAnswer(true)}
              />
            )}
            {showAnswer && (
              <SuperButton
                name={"Next"}
                variant={"contained"}
                borderRadius={"30px"}
                width={"360px"}
                onClickCallBack={setNextCard}
              />
            )}
          </div>
          <Backdrop
            sx={{
              color: "#fff",
              zIndex: (theme) => theme.zIndex.drawer + 1,
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
            }}
            open={isLoading}
          >
            <CircularProgress color="inherit" />
          </Backdrop>
        </div>
      </div>
    </div>
  );
};
