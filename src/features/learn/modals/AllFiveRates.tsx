import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { SuperButton } from "common/components/super-button/SuperButton";

export const AllFiveRatesModal = (props: FiveRateType) => {
  const { redirectToPacksHandler, handleClose, open } = props;

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
    <div>
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
          <Typography id="modal-modal-description" sx={{ mt: 2, mb: 2 }}>
            Do you want learn another pack?
          </Typography>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-evenly" }}>
            <SuperButton name={"Yes"} width={"40px"} onClickCallBack={redirectToPacksHandler} />
            <SuperButton name={"No"} width={"40px"} onClickCallBack={handleClose} />
          </div>
        </Box>
      </Modal>
    </div>
  );
};

type FiveRateType = {
  open: boolean;
  handleClose: () => void;
  redirectToPacksHandler: () => void;
};
