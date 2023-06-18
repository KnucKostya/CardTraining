import * as React from "react";
import { SuperButton } from "common/components/super-button/SuperButton";
import Typography from "@mui/material/Typography";

type PropsType = {
  closeModal: () => void;
  deleteCardCallback: () => void;
};

export const DeleteCard = ({ closeModal, deleteCardCallback }: PropsType) => {
  // const [question, setQuestion] = React.useState("");
  // const [answer, setAnswer] = React.useState("");

  const cancelHandler = () => {
    closeModal();
  };
  const confirmHandler = () => {
    deleteCardCallback();
    closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography id="transition-modal-title" variant="h6" component="h2" sx={{ marginBottom: "29px" }}>
        Are you sure about deleting this card
      </Typography>

      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <SuperButton
          name={"Cancel"}
          width={"130px"}
          height={"40px"}
          borderRadius={"30px"}
          onClickCallBack={cancelHandler}
        />
        <SuperButton
          name={"Delete"}
          width={"130px"}
          height={"40px"}
          borderRadius={"30px"}
          variant={"contained"}
          onClickCallBack={confirmHandler}
        />
      </div>
    </div>
  );
};
