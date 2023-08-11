import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { SuperButton } from "common/components/super-button/SuperButton";
import { toast } from "react-toastify";

type PropsType = {
  closeModal: () => void;
  editCardCallback: (question: string, answer: string, questionImg: string, answerImg: string) => void;
  isImage?: boolean;
};

export const EditCard = ({ closeModal, editCardCallback, isImage }: PropsType) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [answerFile, setAnswerFile] = useState("");
  const [questionFile, setQuestionFile] = useState("");
  console.log(question);
  console.log(answer);
  console.log(answerFile);
  console.log(questionFile);
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    if ((answer && question) !== "") {
      editCardCallback(question, answer, "", "");
    } else if ((answerFile && questionFile) !== "") {
      editCardCallback("", "", questionFile, answerFile);
    }
    closeModal();
  };

  const setQuestionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuestion(event.target.value);
  };

  const setAnswerHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnswer(event.target.value);
  };

  const uploadHandler = (e: any, uploadType: string) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];

      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          if (uploadType === "answer") {
            setAnswerFile(file64);
          } else if (uploadType === "question") {
            setQuestionFile(file64);
          }
        });
      } else {
        toast.error("File is to big, chose another file");
      }
    }
  };
  const convertFileToBase64 = (file: File, callBack: (value: string) => void) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const file64 = reader.result as string;
      callBack(file64);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {isImage ? (
        <span>
          <TextField
            type="file"
            variant="standard"
            onChange={(event) => uploadHandler(event, "question")}
            label="Choose Question File"
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
          <TextField
            type="file"
            variant="standard"
            onChange={(event) => uploadHandler(event, "answer")}
            label="Choose Answer File"
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
        </span>
      ) : (
        <span>
          <TextField
            autoFocus
            margin="none"
            type="text"
            variant="standard"
            onChange={setQuestionHandler}
            label="Question"
            fullWidth
            InputLabelProps={{
              style: {
                fontSize: "20px",
              },
            }}
            InputProps={{
              style: {
                marginTop: "5%",
                marginBottom: "7%",
                width: "100%",
                fontSize: "20px",
              },
            }}
          />
          <TextField
            type="text"
            variant="standard"
            onChange={setAnswerHandler}
            label="Answer"
            fullWidth
            InputLabelProps={{
              style: {
                fontSize: "20px",
              },
            }}
            InputProps={{
              style: {
                marginTop: "5%",
                marginBottom: "7%",
                width: "100%",
                fontSize: "20px",
              },
            }}
          />
        </span>
      )}

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
