import * as React from "react";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { SuperButton } from "common/components/super-button/SuperButton";
import { useActions } from "common/hooks/useActions";
import { packsThunks } from "features/packs/packsSlice";
import s from "./AddPack.module.scss";
import defaultPackAva from "assets/images/defaultPackLogo.svg";
import Button from "@mui/material/Button";
import { ChangeEvent, useRef, useState } from "react";

type PropsType = {
  closeModal: () => void;
};

export const AddPackModal = ({ closeModal }: PropsType) => {
  const { addPack } = useActions(packsThunks);
  const [checked, setChecked] = React.useState(true);
  const [name, setName] = React.useState("");
  const [packCover, setPackCover] = useState(defaultPackAva);
  const [isAvaBroken, setIsAvaBroken] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const cancelHandler = () => {
    closeModal();
  };
  const saveHandler = () => {
    addPack({ name: name, deckCover: packCover });
    closeModal();
  };

  const uploadHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length) {
      const file = e.target.files[0];
      if (file.size < 4000000) {
        convertFileToBase64(file, (file64: string) => {
          setPackCover(file64);
        });
      } else {
        console.error("Error: ", "Файл слишком большого размера");
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

  const imgErrorHandler = () => {
    setIsAvaBroken(true);
    alert("Image is broken");
  };

  return (
    <div className={s.content}>
      <div className={s.coverBlock}>
        <img src={isAvaBroken ? defaultPackAva : packCover} alt="cover" onError={imgErrorHandler} />
        <label style={{ width: "100%" }}>
          <input style={{ display: "none" }} type="file" onChange={uploadHandler} accept="image/*" />
          <Button variant={"outlined"} component="span" sx={{ width: "100%", textTransform: "none" }}>
            Add or Change Pack Cover
          </Button>
        </label>
      </div>
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
