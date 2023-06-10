import Button from "@mui/material/Button";
import { useLocation, useNavigate } from "react-router-dom";

type ButtonPropsType = {
  name: string;
  route?: string;
  size?: "small" | "medium" | "large";
  color?: "inherit" | "primary" | "secondary" | "success" | "error" | "info" | "warning";
};

export const MuiButton = (props: ButtonPropsType) => {
  const { name, size, color, route } = props;

  const location = useLocation();
  const { pathname } = location;
  const isActive = (route: string | undefined) => {
    if (route) {
      return route === location.pathname;
    }
    // роут из пропсов === текущему пути URL на котором находимся
    // для подкрашивания кнопки
  };

  const navigate = useNavigate();
  const handleClick = () => {
    navigate(route ? route : "");
    //если роут в пропсах есть, то переходим, если нет то ничего не делаем
  };
  return (
    <Button
      variant={isActive(route) ? "contained" : "outlined"}
      size={size}
      onClick={handleClick}
      color={color}
    >
      {name}
    </Button>
  );
};
