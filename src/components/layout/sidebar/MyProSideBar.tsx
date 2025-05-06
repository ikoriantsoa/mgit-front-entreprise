import { Menu, Sidebar } from "react-pro-sidebar";
import { useProSidebar } from "react-pro-sidebar";

import { Box, useMediaQuery, useTheme } from "@mui/material";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import EngineeringOutlinedIcon from "@mui/icons-material/EngineeringOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import WorkOutlineOutlinedIcon from "@mui/icons-material/WorkOutlineOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import CampaignOutlinedIcon from "@mui/icons-material/CampaignOutlined";
import SlideshowOutlinedIcon from "@mui/icons-material/SlideshowOutlined";

import keycloak from "@/keycloak/keycloak";
import { useSidebarContext } from "@/context/sidebar/sidebarContext";
import { tokens } from "@/context/theme/theme";
import URLSideBar from "./url/URLSideBar";
import UserProfileSideBar from "./user/UserProfileSideBar";
import TitleSideBar from "./title/TitleSideBar";
import { RouteURL } from "@/routes/RouteURL";

type Propos = {
  children: React.ReactNode;
};
const MyProSidebar = ({ children }: Propos) => {
  // ********************* S T  A T ES APPEL DES CONTEXT*****************

  // ***Theme**
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { sidebarRTL, sidebarImage } = useSidebarContext();

  // ****************side-pro
  const { collapsed } = useProSidebar();

  // ******************keycloak

  const userInfo = {
    email: "",
    username: "",
    name: "",
    id: "" as string | undefined,
  };
  // ************************ info user ********
  if (keycloak && keycloak.idTokenParsed) {
    userInfo.email = keycloak.idTokenParsed.email;
    userInfo.username = keycloak.idTokenParsed.preferred_username;
    userInfo.id = keycloak.idTokenParsed.sub;

    if (userInfo.email) {
      userInfo.name = userInfo.email
        .split("@")[0]
        .substring(0, 2)
        .toUpperCase();
    }
  }

  // *****************************url
  const link = RouteURL

  //media-query
  const matches = useMediaQuery("(min-width:768px)");

  console.log(matches);
  return (
    <div className="h-[100vh]">
      <div className="fixed h-full z-[1000] top-0 left-0 h-full overflow-y-auto transition-all duration-300">
        {/* ****************sidebar********* */}

        <Sidebar
          breakPoint="md"
          rtl={sidebarRTL}
          backgroundColor={colors.primary[400]}
          image={sidebarImage}
          className="h-full overflow-y-auto"
        >
          <Menu>
            {/* ****entete , titre et le buttons** */}
            <TitleSideBar space="entreprise" />

            {/* ***********USERprofile** */}
            {!collapsed && <UserProfileSideBar userInfo={userInfo} />}

            {/* *********Les urls ********* */}
            <URLSideBar link={link} />
          </Menu>
        </Sidebar>
      </div>

      <div
        className={`${
          matches ? (collapsed ? "ml-20" : "ml-64") : ""
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default MyProSidebar;
