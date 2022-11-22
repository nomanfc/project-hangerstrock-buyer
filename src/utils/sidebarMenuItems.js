import React from "react";

/* Menu Icons */
import DashboardIcon from "@mui/icons-material/Dashboard";
import GroupIcon from "@mui/icons-material/Group";
import SettingsIcon from "@mui/icons-material/Settings";
import GavelIcon from "@mui/icons-material/Gavel";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MailIcon from '@mui/icons-material/Mail';
import CommentIcon from '@mui/icons-material/Comment';
import {FaBloggerB} from "react-icons/fa"

export const menu = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    to: "/",
    onActive: "",
  },

  {
    icon: <GavelIcon />,
    title: "Auctions",
    to: "/auctions",
    onActive: "auctions",
  },

  {
    icon: <GroupIcon />,
    title: "Users",
    to: "/users",
    onActive: "users",
  },

  {
    icon: <MailIcon />,
    title: "Support Message",
    to: "/supportbox",
    onActive: "supportbox",
  },

  {
    icon: <FaBloggerB style={{fontSize:"22px"}} />,
    title: "Blogs",
    onActive: "blogs",
    items: [
      {
        title: "All Blogs",
        to: "/blogs/",
        onActive: "blogs",
      },
      {
        title: "Create Blog",
        to: "/blogs/createblog",
        onActive: "createblog",
      },
    ],
  },

  {
    icon: <AdminPanelSettingsIcon />,
    title: "Admins",
    onActive: "admin",
    items: [
      {
        title: "All Admins",
        to: "/admin/",
        onActive: "admin",
      },
      {
        title: "Create Admin",
        to: "/admin/create",
        onActive: "create",
      },
    ],
  },

  {
    icon: <SettingsIcon />,
    title: "Settings",
    onActive: "settings",
    items: [
      {
        title: "Location data",
        to: "/settings/location_data",
        onActive: "location_data",
      },
      {
        title: "Auction data",
        to: "/settings/auction",
        onActive: "auction",
      },

      {
        title: "Profile",
        to: "/settings/profile",
        onActive: "profile",
      },
    ],
  },
];
