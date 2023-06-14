import * as React from "react";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packsSlice";
import Typography from "@mui/material/Typography";

type PropsType = {
  closeModal: () => void;
  _id: string;
  packName: string;
};

export const DeletePackModal = ({ closeModal, _id, packName }: PropsType) => {
  const { removePack } = useActions(packsThunks);

  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    removePack(_id);
    closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ marginBottom: "30px" }}>
        Do you really want to remove <b>{packName}</b> pack?
        <br /> All cards in pack will be deleted!
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
          color={"error"}
          onClickCallBack={saveHandler}
        />
      </div>
    </div>
  );
};
