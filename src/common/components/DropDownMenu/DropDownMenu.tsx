import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { packsApi, UpdatePackResponseType } from "features/packs/packsApi";
import { useAppSelector } from "common/hooks/useAppSelector";
import { packNameSelector } from "features/cards/cardsSelectors";
import { useAppDispatch } from "common/hooks/useAppDispatch";
import { cardsActions } from "features/cards/cardsSlice";
import { AxiosResponse } from "axios";

export function DropDownMenu(props: DropDownMenu) {
  const { packId } = props;
  const dispatch = useAppDispatch();

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const isPackId = (fn: (_id: string) => void) => {
    if (packId) fn(packId);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const editHandle = () => {
    let number = Math.random().toString();
    isPackId((_id: string) =>
      packsApi
        .updatePack({ _id, name: `absolutely New Name ${number}` })
        .then((res: AxiosResponse<UpdatePackResponseType>) =>
          dispatch(cardsActions.addPackName(res.data.updatedCardsPack.name))
        )
    );
    setAnchorEl(null);
  };
  const deleteHandle = () => {
    setAnchorEl(null);
    isPackId((_id: string) => packsApi.removePack(_id));
  };
  const learnHandle = () => {
    setAnchorEl(null);
    // packsApi.removePack()
  };

  return (
    <span>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{ minWidth: "1px", padding: "0" }}
      >
        <MoreVertIcon color={"action"} width={"5px"} style={{ padding: "0" }} />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={editHandle}>Edit</MenuItem>
        <MenuItem onClick={deleteHandle}>Delete</MenuItem>
        <MenuItem onClick={learnHandle}>Learn</MenuItem>
      </Menu>
    </span>
  );
}

type DropDownMenu = {
  packId?: string;
};
