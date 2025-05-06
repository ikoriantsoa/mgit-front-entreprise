import * as React from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";

import Tooltip from "@mui/material/Tooltip";

import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";

import keycloak from "@/keycloak/keycloak";

const UserMenu = () => {
  // ************************S T A T E ****************
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  // *************************navigation ***
  // ****************************keyloak *************

  //   **************fonction deconnexion *********
  const handleLogout = () => {
    if (keycloak) {
      keycloak.logout({
        redirectUri: window.location.origin,
      });
    }
  };

  return (
    <React.Fragment>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center"}}>
        <Tooltip title="Account settings">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <Avatar sx={{ width: 32, height: 32 }}>M</Avatar>
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              mt: 1.5,
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: "background.paper",
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        {/* ***********my account *** */}
        <MenuItem onClick={handleClose}>
          <Avatar />
          <h3 className="text-[15px]">Mon Compte</h3>
        </MenuItem>
        <Divider />

        {/* ***************settings ****** */}
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>

          <h4 className="text-[15px]">Settings</h4>
        </MenuItem>

        {/* ***********logout ****** */}
        <MenuItem
          onClick={() => {
            handleLogout(); //deconnexion
            handleClose();
          }}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>

          <h4 className="text-[15px]">Logout</h4>
        </MenuItem>
      </Menu>
    </React.Fragment>
  );
};

export default UserMenu;
