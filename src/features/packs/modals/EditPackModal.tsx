import * as React from "react";
import { ReactNode } from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packsSlice";
import { useAppSelector } from "../../../common/hooks/useAppSelector";
import { packNameSelector } from "../../cards/cardsSelectors";
import { cardsActions } from "../../cards/cardsSlice";
import { useAppDispatch } from "../../../common/hooks/useAppDispatch";

type PropsType = {
  closeModal: () => void | ReactNode;
  _id: string;
  packName?: string;
  closeSecondModalHandler?: (value: null | HTMLElement) => void;
};

export const EditPackModal = ({ closeModal, _id, closeSecondModalHandler }: PropsType) => {
  const { updatePack } = useActions(packsThunks);
  const dispatch = useAppDispatch();
  const [checked, setChecked] = React.useState(true);
  const packNameMy = useAppSelector(packNameSelector);
  const [name, setName] = React.useState(packNameMy);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleSetName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };
  const cancelHandler = () => {
    closeModal();
    closeSecondModalHandler && closeSecondModalHandler(null);
  };
  const saveHandler = () => {
    updatePack({ _id, name });
    dispatch(cardsActions.addPackName(name));
    closeModal();
    closeSecondModalHandler && closeSecondModalHandler(null);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <TextField
        autoFocus
        margin="none"
        label="Name pack"
        type="email"
        fullWidth
        variant="standard"
        sx={{ marginBottom: "29px" }}
        size={"medium"}
        value={name}
        onChange={handleSetName}
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
      {/*TODO checkbox data*/}
      <FormControlLabel
        sx={{ marginBottom: "29px" }}
        control={<Checkbox checked={checked} onChange={handleChange} />}
        label="Private pack"
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
