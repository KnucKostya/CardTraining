import * as React from "react";
import TextField from "@mui/material/TextField";
import { SuperButton } from "common/components/super-button/SuperButton";

type PropsType = {
  closeModal: () => void;
  addCardCallback: (question: string, answer: string) => void;
};

export const AddCard = ({ closeModal, addCardCallback }: PropsType) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");

  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    console.log(question, answer);
    addCardCallback(question, answer);
    closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
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

      <div style={{ display: "flex", justifyContent: "space-between" }}>
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
