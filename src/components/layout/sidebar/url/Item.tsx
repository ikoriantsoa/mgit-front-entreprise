import { useTheme } from "@mui/material";
import { MenuItem } from "react-pro-sidebar";
import { useLocation, Link } from "react-router-dom";
import { useState } from "react";
import { tokens } from "@/context/theme/theme";


type Props = {
  path: string;
  icon: React.ReactNode;
  name: string;
};

const Item = ({ path, icon, name }: Props) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [hover, setHover] = useState(false);
  const { pathname } = useLocation();

  let isPageStyle = "";

  if (hover || pathname.split("/").includes(name)) {
    isPageStyle = colors.greenAccent[500];
  } else if (name === "dashboard" && pathname === "/") {
    isPageStyle = colors.greenAccent[500];
  } else {
    isPageStyle = colors.grey[100];
  }

  return (
    <MenuItem
      style={{
        color: isPageStyle,
        background: hover ? "transparent" : "transparent",
      }}
      icon={icon}
      component={<Link to={path} />}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <h4 className="capitalize text-[14px] font-semibold">{name}</h4>
    </MenuItem>
  );
};

export default Item;
