import * as React from "react";

import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Fade from "@mui/material/Fade";
import LanguageIcon from "@mui/icons-material/Language";
import { IconButton, Typography } from "@mui/material";

export default function Language() {
  // *************************** S T A T E*****************
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // ********************************** E V E N T ***************

  // // ***********change la langue *********
  // const handleChangeLanguage = (lng: string) => {
  //   i18n.changeLanguage(lng);
  //   localStorage.setItem("i18nextLng", lng);
  // };



  // *********************** R E N D E R ***************
  return (
    <div className="pt-1 ml-4">
      <IconButton
        id="fade-button"
        aria-controls={open ? "fade-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <LanguageIcon fontSize="medium" />
      </IconButton>
      <Menu
        id="fade-menu"
        MenuListProps={{
          "aria-labelledby": "fade-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <MenuItem
          onClick={() => {
            handleClose();
            // handleChangeLanguage("en");
          }}
        >
          <Typography variant="h5">English</Typography>
        </MenuItem>
        <MenuItem
          onClick={() => {
            handleClose();
            // handleChangeLanguage("fr");
          }}
        >
          <Typography variant="h5">Francais</Typography>
        </MenuItem>

        <MenuItem
          onClick={() => {
            handleClose();
            // handleChangeLanguage("ds");
          }}
        >
          <Typography variant="h5">Deutsch</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
}
