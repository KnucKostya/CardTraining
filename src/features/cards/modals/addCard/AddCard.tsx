import * as React from "react";
import TextField from "@mui/material/TextField";
import { SuperButton } from "common/components/super-button/SuperButton";
import { ChangeEvent, useState } from "react";
import s from "features/cards/modals/addCard/addCard.module.scss";
import { toast } from "react-toastify";

type PropsType = {
  closeModal: () => void;
  addCardCallback: (params: AddCardCallbackType) => void;
};
export type AddCardCallbackType = {
  question?: string;
  answer?: string;
  questionImg?: string;
  answerImg?: string;
};

export const AddCard = ({ closeModal, addCardCallback }: PropsType) => {
  const [variant, setVariant] = useState("text");
  const [answerFile, setAnswerFileFile] = useState("");
  const [questionFile, setQuestionFile] = useState("");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    if ((questionFile && answerFile) || (question && answer)) {
      addCardCallback({ answer, question, answerImg: answerFile, questionImg: questionFile });
      closeModal();
    } else toast.error("you are not added question or answer");
  };

  const changeSelectValue = (event: ChangeEvent<HTMLSelectElement>) => setVariant(event.target.value);

  const uploadQuestionFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setQuestionFile(URL.createObjectURL(event.target.files![0]));
  };

  const uploadAnswerFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setAnswerFileFile(URL.createObjectURL(event.target.files![0]));
  };

  return (
    <div className={s.addCardContainer}>
      <div className={s.questionFormatSelector}>
        <h4>Chose a question format:</h4>
        <select name="chose" className={s.selector} onChange={changeSelectValue}>
          <option onClick={() => setVariant("text")} value="text">
            Text
          </option>
          <option onClick={() => setVariant("image")} value="image">
            Image
          </option>
        </select>
      </div>
      {variant === "text" ? (
        <div>
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setQuestion(event.target.value);
            }}
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setAnswer(event.target.value);
            }}
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
        </div>
      ) : (
        <div className={s.imgLearnContainer}>
          <h5 className={s.question}>Question:</h5>
          {questionFile && <img src={questionFile} alt="question image" className={s.photo} />}
          <TextField
            type="file"
            variant="standard"
            onChange={uploadQuestionFileHandler}
            label="Choose File"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: {
                marginTop: "5%",
                marginBottom: "5%",
                width: "100%",
              },
            }}
          />
          <h5 className={s.answer}>Answer:</h5>
          {answerFile && <img src={answerFile} alt="answer image" className={s.photo} />}
          <TextField
            type="file"
            variant="standard"
            onChange={uploadAnswerFileHandler}
            label="Choose File"
            InputLabelProps={{
              shrink: true,
            }}
            InputProps={{
              style: {
                marginTop: "5%",
                marginBottom: "7%",
                width: "100%",
              },
            }}
          />
        </div>
      )}

      <div className={s.buttons}>
        <SuperButton
          name={"Cancel"}
          width={"130px"}
          height={"40px"}
          borderRadius={"30px"}
          onClickCallBack={cancelHandler}
        />
        <SuperButton
          name={"Add"}
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
