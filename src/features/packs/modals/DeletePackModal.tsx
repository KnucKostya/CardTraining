import * as React from "react";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packsSlice";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

type PropsType = {
  closeModal: () => void;
  _id: string;
  packName?: string;
  closeSecondModalHandler?: (value: null | HTMLElement) => void;
};

export const DeletePackModal = ({ closeModal, _id, packName, closeSecondModalHandler }: PropsType) => {
  const { removePack } = useActions(packsThunks);
  const location = useLocation();
  console.log(location.pathname.includes("/cards/pack/"));
  // const { packId } = useParams();
  const navigate = useNavigate();

  const cancelHandler = () => {
    closeSecondModalHandler && closeSecondModalHandler(null);
    closeModal();
  };
  const saveHandler = () => {
    removePack(_id)
      .then(() => {
        if (location.pathname.includes("/cards/pack/")) navigate("/packs");
        toast.success(`${packName} pack successfully deleted `);
      })
      .catch((e: any) => {
        e?.message ? toast.error(e.message) : toast.error(e.errorMessage);
      });
    closeSecondModalHandler && closeSecondModalHandler(null);
    closeModal();
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <Typography sx={{ marginBottom: "30px", marginTop: "35px" }}>
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
