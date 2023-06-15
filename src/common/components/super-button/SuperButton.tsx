import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";
import React, { ReactNode } from "react";

// EXAMPLE CALL with PROPS ===============

//import LogoutIcon from "@mui/icons-material/Logout";

// <MuiButton
//   redirectPath={"/packs"}   // optional Link To
//   onClickCallBack={onClickHandler} // optional callback
//   name={"LOGOUT"} // optional name
//   startIcon={<Icon />} // optional Icon (startIcon / endIcon)
//   width={"127px"} // optional
//   height={"36px"} // optional
//   borderRadius={"10px"} // optional
//   color={"inherit"} // optional
// />

// =============================================

type ButtonPropsType = {
  variant?: "contained" | "outlined" | "text";
  name: string;
  redirectPath?: string;
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  width?: string;
  height?: string;
  borderRadius?: string;
  onClickCallBack?: () => void;
  type?: string;
};

export const SuperButton = (props: ButtonPropsType) => {
  const {
    name,
    color,
    redirectPath,
    startIcon,
    endIcon,
    width,
    height,
    borderRadius,
    onClickCallBack,
    type,
    variant,
  } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const handleClick = () => {
    if (props.redirectPath) {
      navigate(`${redirectPath}`);
    }
    if (onClickCallBack) {
      onClickCallBack();
    }
  };
  const isActive = (redirectPath: string | undefined) => {
    if (redirectPath) {
      return redirectPath === location.pathname;
    }
  };

  return (
    <Button
      type={type === "submit" ? "submit" : "button"}
      sx={{
        width: width ? width : "171px",
        height: height ? height : "36px",
        boxShadow: "0px 2px 10px rgba(109, 109, 109, 0.25), inset 0px 1px 0px rgba(255, 255, 255, 0.3)",
        borderRadius: borderRadius,
        textTransform: "none",
      }}
      variant={isActive(redirectPath) ? "contained" : variant ? variant : "outlined"}
      onClick={handleClick}
      color={color}
      startIcon={startIcon}
      endIcon={endIcon}
    >
      {name ? name : "button"}
    </Button>
  );
};
