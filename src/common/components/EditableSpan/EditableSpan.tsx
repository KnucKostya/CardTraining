import React, { ChangeEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import s from "./EditableSpan.module.scss";
import pen from "./editIcon.svg";

type EditableSpanPropsType = {
  value: string;
  onChange: (newValue: string) => void;
  disabled: boolean;
};

export const EditableSpan = React.memo(function (props: EditableSpanPropsType) {
  let [editMode, setEditMode] = useState(false);
  let [title, setTitle] = useState(props.value);

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.value);
  };
  const activateViewMode = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };
  const handleKeyPress = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter") {
      activateViewMode();
    }
  };

  return editMode ? (
    <TextField
      variant="filled"
      label={"Name"}
      disabled={props.disabled}
      value={title}
      onChange={changeTitle}
      autoFocus
      onBlur={activateViewMode}
      onKeyPress={handleKeyPress}
    />
  ) : (
    <div className={s.titleStyle} onDoubleClick={activateEditMode}>
      {props.value}
      <img src={pen} alt="pen" />
    </div>
  );
});
