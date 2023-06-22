import * as React from "react";
import TextField from "@mui/material/TextField";
import { SuperButton } from "common/components/super-button/SuperButton";
import { ChangeEvent, useState } from "react";
import { useAppSelector } from "common/hooks/useAppSelector";
import { cardsSelector } from "features/cards/cardsSelectors";
import s from "./editCard.module.scss";

type PropsType = {
  closeModal: () => void;
  editCardCallback: (question: string, answer: string) => void;
  isImage?: boolean;
};

export const EditCard = ({ closeModal, editCardCallback, isImage }: PropsType) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [answerFile, setAnswerFileFile] = useState("");
  const [questionFile, setQuestionFile] = useState("");
  const cards = useAppSelector(cardsSelector);

  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    editCardCallback(question, answer);
    closeModal();
  };

  const setQuestionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const setAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const uploadQuestionFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFile(URL.createObjectURL(event.target.files![0]));
  };

  const uploadAnswerFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerFileFile(URL.createObjectURL(event.target.files![0]));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/*{!cards?.map((row) => row.question.includes("blob")) ? (*/}
      <span>
        <TextField
          autoFocus
          margin="none"
          label="Question"
          type="email"
          fullWidth
          variant="standard"
          sx={{ marginBottom: "29px" }}
          size={"medium"}
          value={question}
          onChange={setQuestionHandler}
          InputProps={{
            style: {
              fontSize: "20px",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: "20px",
            },
          }}
        />
        <TextField
          margin="none"
          label="Answer"
          type="email"
          fullWidth
          variant="standard"
          sx={{ marginBottom: "29px" }}
          size={"medium"}
          value={answer}
          onChange={setAnswerHandler}
          InputProps={{
            style: {
              fontSize: "20px",
            },
          }}
          InputLabelProps={{
            style: {
              fontSize: "20px",
            },
          }}
        />
      </span>
      {/*) : (*/}
      {/*<div className={s.imgLearnContainer}>*/}
      {/*  <h5 className={s.question}>Question:</h5>*/}
      {/*  {questionFile && <img src={questionFile} alt="question image" className={s.photo} />}*/}
      {/*  <TextField*/}
      {/*    type="file"*/}
      {/*    variant="standard"*/}
      {/*    onChange={uploadQuestionFileHandler}*/}
      {/*    label="Choose File"*/}
      {/*    InputLabelProps={{*/}
      {/*      shrink: true,*/}
      {/*    }}*/}
      {/*    InputProps={{*/}
      {/*      style: {*/}
      {/*        marginTop: "5%",*/}
      {/*        marginBottom: "5%",*/}
      {/*        width: "100%",*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*  <h5 className={s.answer}>Answer:</h5>*/}
      {/*  {answerFile && <img src={answerFile} alt="answer image" className={s.photo} />}*/}
      {/*  <TextField*/}
      {/*    type="file"*/}
      {/*    variant="standard"*/}
      {/*    onChange={uploadAnswerFileHandler}*/}
      {/*    label="Choose File"*/}
      {/*    InputLabelProps={{*/}
      {/*      shrink: true,*/}
      {/*    }}*/}
      {/*    InputProps={{*/}
      {/*      style: {*/}
      {/*        marginTop: "5%",*/}
      {/*        marginBottom: "7%",*/}
      {/*        width: "100%",*/}
      {/*      },*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</div>*/}
      {/*)}*/}
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SuperButton
          name={"Cancel"}
          width={"130px"}
          height={"40px"}
          borderRadius={"30px"}
          onClickCallBack={cancelHandler}
        />
        <SuperButton
          name={"Save"}
          width={"130px"}
          height={"40px"}
          borderRadius={"30px"}
          variant={"contained"}
          onClickCallBack={saveHandler}
        />
      </div>
    </div>
  );
};
