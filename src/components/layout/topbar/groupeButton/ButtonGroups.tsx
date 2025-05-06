import { IconButton } from "@mui/material";

import { useProSidebar } from "react-pro-sidebar";
// import { useContext } from "react";

import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import UserMenu from "./userprofile/UserMenu";
import Language from "./language/Language";
// import { ColorModeContext } from "../../../context/theme/theme";

type Props = {};

const ButtonGroups = ({}: Props) => {
  // Utilise le hook `useTheme` pour accéder au thème actuel de Material-UI.
  // const theme = useTheme();

  // Accède au contexte `ColorModeContext` pour gérer le mode clair/sombre.
  // const colorMode = useContext(ColorModeContext);

  const { toggleSidebar, broken, rtl } = useProSidebar();
  return (
    <div className="flex">
      {/* ********** language  ******** */}
      <Language />

      {/* Bouton pour afficher les notifications. */}
      <IconButton sx={{ ml: 2 }}>
        <NotificationsOutlinedIcon fontSize="medium" />
      </IconButton>

      {/* Bouton pour accéder au profil utilisateur. */}
      <UserMenu />

      {broken && rtl && (
        <IconButton
          // sx={{ margin: "0 6px 0 2px" }} // Ajoute des marges autour du bouton.
          onClick={() => toggleSidebar()} // Appelle `toggleSidebar` pour afficher/masquer la barre latérale.
        >
          {/* Icône de menu. */}
          <MenuOutlinedIcon />
        </IconButton>
      )}
    </div>
  );
};

export default ButtonGroups;
