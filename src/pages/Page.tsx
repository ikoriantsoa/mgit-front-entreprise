import { ThemeProvider } from "@emotion/react";

import { ColorModeContext, useMode } from "../context/theme/theme";
import { MyProSidebarProvider } from "../context/sidebar/sidebarContext";
import Topbar from "@/components/layout/topbar/Topbar";
import { useLocation } from "react-router-dom";


type Props = {
  children: React.ReactNode;
};

const Page = ({ children }: Props) => {
  // Utilisation du hook `useMode` pour obtenir le thème (`theme`) et l'objet `colorMode` contenant la méthode `toggleColorMode`
  const [theme, colorMode] = useMode();

  const { pathname } = useLocation();

  console.log(pathname.split("/").length);

  return (
    // Le `ColorModeContext.Provider` fournit l'objet `colorMode` à tous les composants enfants via le contexte React
    <ColorModeContext.Provider
      value={
        colorMode as {
          toggleColorMode: () => void;
        }
      }
    >
      {/* Le `ThemeProvider` applique le thème (`theme`) à tous les composants enfants */}
      <div className="relative">
        <ThemeProvider theme={theme}>
          {/* `CssBaseline` réinitialise les styles CSS par défaut pour garantir une base propre et cohérente */}
          <MyProSidebarProvider>
            <div style={{ height: "100%", width: "100%" }}>
              <main>
                <Topbar />
                <div className=" w-full relative md:px-2">{children}</div>
              </main>
            </div>
          </MyProSidebarProvider>
        </ThemeProvider>
      </div>
    </ColorModeContext.Provider>
  );
};

export default Page;
