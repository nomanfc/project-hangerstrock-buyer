import React, { useState, useEffect, useContext } from "react";
import Image from "next/image";

import Badge from "@mui/material/Badge";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/Logout";
import Avatar from "../../icons/profile.png";
import { useUserContext } from "../../contexts/UserContext";

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }
      window.addEventListener("resize", handleResize);
      handleResize();
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);
  return windowSize;
}

const Navbar = () => {
  const size = useWindowSize();
  const { user, logout } = useUserContext();

  return (
    <>
      <div
        style={{
          display: size.width <= 730 ? "none" : "flex",
          width: "50%",
          height: "100%",
          flexDirection: "column",
          paddingTop: "25px",
        }}
      >
        {user && (
          <div
            style={{
              fontSize: "22px",
              fontWeight: "600",
              color: "#202124",
              textTransform: "capitalize",
            }}
          >
            Hello,{" "}
            <span style={{ color: "#599f22" }}>
              {user?.first_name} {user?.last_name}
            </span>{" "}
            Welcome back!
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          width: size?.width <= 730 ? "100%" : "50%",
          height: "100%",
          flexDirection: "row",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* <IconButton>
          <SettingsIcon style={{ color: "#8B8C8C" }} />
        </IconButton>
        <IconButton>
          <Badge badgeContent={4} color="primary">
            <NotificationsIcon style={{ color: "#8B8C8C" }} />
          </Badge>
        </IconButton> */}
        {/* <div
          style={{
            height: "20px",
            width: "20px",
            padding: "10px",
            borderRadius: "50%",
            cursor: "pointer",
            border: "1px solid green",
          }}
        >
          <Image style={{ padding: "10px" }} src={Avatar} alt="HangerStock" />
        </div> */}
        <IconButton onClick={logout}>
          <LogoutIcon style={{ color: "red", fontWeight: 700 }} />
        </IconButton>
      </div>
    </>
  );
};

export default Navbar;
