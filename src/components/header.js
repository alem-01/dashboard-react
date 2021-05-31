import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

import SideBar from "./sidebar";

const useStyles = makeStyles((theme) => ({
  header: {
    backgroundColor: "#1F1F1F",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "18px",
    minWidth: "min-content",
    [theme.breakpoints.down("xs")]: {
      display: "none",
    },
  },
  sideBar: {
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
}));

const headersData = [
  {
    label: "Dashboard",
    href: "/leaderboard",
    type: "inner",
  },
  {
    label: "Progress",
    href: "https://progress.alem.school/",
    type: "outer",
  },
  {
    label: "Profile",
    href: "https://profile.alem.school/",
    type: "outer",
  },
  {
    label: "Intra",
    href: "https://01.alem.school/",
    type: "outer",
  },
  {
    label: "Gitea",
    href: "https://git.01.alem.school/",
    type: "outer",
  },
];

const Header = ({ onServiceChange }) => {
  const { header, menuButton, sideBar } = useStyles();
  const displayDesktop = () => {
    return (
      <Toolbar>
        <div className={sideBar}>
          <SideBar
            className={sideBar}
            links={headersData}
            linkType={linkType}
          />
        </div>
        {getMenuButtons()}
      </Toolbar>
    );
  };

  const linkType = (type, href) => {
    return type === "inner"
      ? { to: href, component: RouterLink }
      : { href: href, component: Link };
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href, type }) => (
      <Button
        className={menuButton}
        {...{
          key: label,
          color: "inherit",
          ...linkType(type, href),
        }}
      >
        {label}
      </Button>
    ));
  };

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
};

export default Header;
