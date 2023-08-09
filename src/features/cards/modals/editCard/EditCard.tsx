import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useAppSelector } from "common/hooks/useAppSelector";
import { cardsSelector } from "features/cards/cardsSelectors";
import { toast } from "react-toastify";

type PropsType = {
  closeModal: () => void;
  editCardCallback: (question: string, answer: string) => void;
  isImage?: boolean;
};

export const EditCard = ({ closeModal, editCardCallback, isImage }: PropsType) => {
  const [question, setQuestion] = React.useState("");
  const [answer, setAnswer] = React.useState("");
  const [answerFile, setAnswerFile] = useState("");
  const [questionFile, setQuestionFile] = useState("");
  const cards = useAppSelector(cardsSelector);
  console.log(question);
  console.log(answer);
  console.log(questionFile);
  console.log(answerFile);
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    if ((answer && question) !== "") {
      editCardCallback(question, answer);
    } else if ((answerFile && questionFile) !== "") {
      editCardCallback(questionFile, answerFile);
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
      console.log("file: ", file);

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

  // const uploadQuestionFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setQuestionFile(URL.createObjectURL(event.target.files![0]));
  // };
  //
  // const uploadAnswerFileHandler = (event: ChangeEvent<HTMLInputElement>) => {
  //   setAnswerFile(URL.createObjectURL(event.target.files![0]));
  // };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      {/*{cards?.map((row) => row.question !== "") ? (*/}
      {/*  <span>*/}
      {/*    <TextField*/}
      {/*      autoFocus*/}
      {/*      margin="none"*/}
      {/*      label="Question"*/}
      {/*      type="email"*/}
      {/*      fullWidth*/}
      {/*      variant="standard"*/}
      {/*      sx={{ marginBottom: "29px" }}*/}
      {/*      size={"medium"}*/}
      {/*      value={question}*/}
      {/*      onChange={setQuestionHandler}*/}
      {/*      InputProps={{*/}
      {/*        style: {*/}
      {/*          fontSize: "20px",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      InputLabelProps={{*/}
      {/*        style: {*/}
      {/*          fontSize: "20px",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <TextField*/}
      {/*      margin="none"*/}
      {/*      label="Answer"*/}
      {/*      type="email"*/}
      {/*      fullWidth*/}
      {/*      variant="standard"*/}
      {/*      sx={{ marginBottom: "29px" }}*/}
      {/*      size={"medium"}*/}
      {/*      value={answer}*/}
      {/*      onChange={setAnswerHandler}*/}
      {/*      InputProps={{*/}
      {/*        style: {*/}
      {/*          fontSize: "20px",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*      InputLabelProps={{*/}
      {/*        style: {*/}
      {/*          fontSize: "20px",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </span>*/}
      {/*) : (*/}
      {/*  <div className={s.imgLearnContainer}>*/}
      {/*    /!*<h5 className={s.question}>Question:</h5>*!/*/}
      {/*    {questionFile! == "" && <img src={questionFile} alt="question image" className={s.photo} />}*/}
      {/*    <TextField*/}
      {/*      type="file"*/}
      {/*      variant="standard"*/}
      {/*      onChange={(event) => uploadHandler(event, "question")}*/}
      {/*      label="Choose File"*/}
      {/*      InputLabelProps={{*/}
      {/*        shrink: true,*/}
      {/*      }}*/}
      {/*      InputProps={{*/}
      {/*        style: {*/}
      {/*          marginTop: "5%",*/}
      {/*          marginBottom: "5%",*/}
      {/*          width: "100%",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    />*/}
      {/*    <h5 className={s.answer}>Answer:</h5>*/}
      {/*    {answerFile && <img src={answerFile} alt="answer image" className={s.photo} />}*/}
      {/*    <TextField*/}
      {/*      type="file"*/}
      {/*      variant="standard"*/}
      {/*      onChange={(event) => uploadHandler(event, "answer")}*/}
      {/*      label="Choose File"*/}
      {/*      InputLabelProps={{*/}
      {/*        shrink: true,*/}
      {/*      }}*/}
      {/*      InputProps={{*/}
      {/*        style: {*/}
      {/*          marginTop: "5%",*/}
      {/*          marginBottom: "7%",*/}
      {/*          width: "100%",*/}
      {/*        },*/}
      {/*      }}*/}
      {/*    />*/}
      {/*  </div>*/}
      {/*)}*/}

      {cards?.map((card) => {
        if (card.questionImg && card.answerImg) {
          return (
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
          );
        } /*if (card.question && card.answer) else {
          return (
            <span>
              <TextField
                type="text"
                variant="standard"
                onChange={setQuestionHandler}
                label="Question"
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
                type="text"
                variant="standard"
                onChange={setAnswerHandler}
                label="Answer"
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
          );
        }*/
      })}
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
