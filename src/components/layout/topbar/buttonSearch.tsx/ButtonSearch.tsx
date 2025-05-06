import { IconButton } from "@mui/material";

import { useProSidebar } from "react-pro-sidebar";

import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";

type Props = {};

const ButtonSearch = ({}: Props) => {
  // Utilise le hook `useTheme` pour accéder au thème actuel de Material-UI.

  // Accède au contexte `ColorModeContext` pour gérer le mode clair/sombre.

  const { toggleSidebar, broken, rtl } = useProSidebar();
  return (
    <div className="">
      {broken && !rtl && (
        <IconButton
          sx={{ margin: "0 6px 0 2px" }} // Ajoute des marges autour du bouton.
          onClick={() => toggleSidebar()} // Appelle `toggleSidebar` pour afficher/masquer la barre latérale.
        >
          {/* Icône de menu. */}
          <MenuOutlinedIcon />
        </IconButton>
      )}

      {/* Conteneur pour la barre de recherche. */}
    </div>
  );
};

export default ButtonSearch;
