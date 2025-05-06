import DashboardOutlinedIcon from "@mui/icons-material/DashboardOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import EventNoteOutlinedIcon from "@mui/icons-material/EventNoteOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";

export const RouteURL = [
  // Dashboard
  {
    name: "dashboard",
    children: [
      {
        path: "/",
        name: "dashboard",
        icon: <DashboardOutlinedIcon />,
      },
    ],
  },

  // Webinaires
  {
    name: "webinaires",
    children: [
      {
        path: "/webinaires",
        name: "webinaires",
        icon: <BusinessOutlinedIcon />,
      },
    ],
  },

  // Stagiaires
  {
    name: "stagiaires",
    children: [
      {
        path: "/stagiaires",
        name: "stagiaires",
        icon: <GroupOutlinedIcon />,
      },
    ],
  },

  // Agenda
  {
    name: "agenda",
    children: [
      {
        path: "/calendrier",
        name: "calendrier",
        icon: <EventNoteOutlinedIcon />,
      },
    ],
  },

  // Informations
  {
    name: "info",
    children: [
      {
        path: "/messages",
        name: "messages",
        icon: <MessageOutlinedIcon />,
      },
      {
        path: "/notifications",
        name: "notifications",
        icon: <NotificationsOutlinedIcon />,
      },
    ],
  },
];
