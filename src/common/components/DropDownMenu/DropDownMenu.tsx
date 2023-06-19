import React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { EditPackModal } from "features/packs/modals/EditPackModal";
import { BaseModal } from "../BasicModal/BaseModal";
import { DeletePackModal } from "features/packs/modals/DeletePackModal";
import { useAppSelector } from "../../hooks/useAppSelector";
import { packNameSelector } from "features/cards/cardsSelectors";
import { Link, Navigate } from "react-router-dom";
import { RouteNames } from "app/routes";

export function DropDownMenu(props: DropDownMenu) {
  const { packId } = props;
  const packName = useAppSelector(packNameSelector);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  // const isPackId = (fn: (_id: string) => void) => {
  //   if (packId) fn(packId);
  // };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // const editHandle = (close: any) => {
  //   setAnchorEl(null);
  // };
  //
  // const deleteHandle = () => {
  //   // setAnchorEl(null);
  //   isPackId((_id: string) => packsApi.removePack(_id));
  // };

  const learnHandle = () => {
    setAnchorEl(null);
    return <Navigate to={RouteNames.LEARN} />;
    // setAnchorEl(null);
  };
  // const saveHandler = () => {
  //   removePack(_id)
  //       .then(() => {
  //         // if()
  //         navigate("/packs");
  //         toast.success(`${packName} pack successfully deleted `);
  //       })
  //       .catch((e: any) => {
  //         e?.message ? toast.error(e.message) : e.errorMessage;
  //       });
  //   closeSecondModalHandler && closeSecondModalHandler(null);
  //   closeModal();
  // };
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
        <MenuItem>
          <label style={{ cursor: "pointer" }}>
            Edit
            <BaseModal modalTitle={"Edit"} buttonType={"iconEdit"}>
              {(close) => (
                <EditPackModal closeModal={close} _id={packId!} closeSecondModalHandler={setAnchorEl} />
              )}
            </BaseModal>
          </label>
        </MenuItem>
        <MenuItem>
          <label style={{ cursor: "pointer" }}>
            Delete
            <BaseModal modalTitle={"Delete"} buttonType={"iconDelete"}>
              {(close) => (
                <DeletePackModal
                  closeModal={close}
                  _id={packId!}
                  packName={packName}
                  closeSecondModalHandler={setAnchorEl}
                />
              )}
            </BaseModal>
          </label>
        </MenuItem>
        <MenuItem component={Link} to={`/learn/${packId}`}>
          Learn
        </MenuItem>
      </Menu>
    </span>
  );
}

type DropDownMenu = {
  packId?: string;
};
