import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packsSlice";

type PropsType = {
  closeModal: () => void;
  _id: string;
  packName: string;
};

export const EditPackModal = ({ closeModal, _id, packName }: PropsType) => {
  const { updatePack } = useActions(packsThunks);
  const [checked, setChecked] = React.useState(true);
  const [name, setName] = React.useState(packName);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    updatePack({ _id, name });
    closeModal();
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
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setName(event.target.value);
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
