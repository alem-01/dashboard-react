import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Link from "@material-ui/core/Link";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles(() => ({
  header: {
    backgroundColor: "#1F1F1F",
    // backgroundColor: "#000000",
    // backgroundColor: "#3F51B5",
    paddingRight: "79px",

    // paddingLeft: "118px",
    // paddingLeft: "10%",
  },
  logo: {
    fontFamily: "Work Sans, sans-serif",
    fontWeight: 600,
    color: "#FFFEFE",
    textAlign: "left",
  },
  menuButton: {
    fontFamily: "Open Sans, sans-serif",
    fontWeight: 700,
    size: "18px",
    marginLeft: "38px",
  },
  // toolbar: {
  //   display: "flex",
  //   justifyContent: "space-between",
  // },
}));

const headersData = [
  {
    label: "Dashboard",
    href: "/leaderboard",
    type: "in",
  },
  {
    label: "Progress",
    href: "https://progress.alem.school/",
    type: "out",
  },
  {
    label: "Profile",
    href: "https://profile.alem.school/",
    type: "out",
  },
  {
    label: "Intra",
    href: "https://01.alem.school/",
    type: "out",
  },
  {
    label: "Gitea",
    href: "https://git.01.alem.school/",
    type: "out",
  },
];

const Header = ({ onServiceChange }) => {
  const { header, menuButton, toolbar } = useStyles();
  const displayDesktop = () => {
    return <Toolbar className={toolbar}>{getMenuButtons()}</Toolbar>;
  };

  const linkType = (type, href) => {
    return type === "in"
      ? { to: href, component: RouterLink }
      : { href: href, component: Link };
  };

  const getMenuButtons = () => {
    return headersData.map(({ label, href, type }) => {
      return (
        <Button
          {...{
            key: label,
            color: "inherit",
            ...linkType(type, href),
            className: menuButton,
          }}
        >
          {label}
        </Button>
      );
    });
  };

  return (
    <header>
      <AppBar className={header}>{displayDesktop()}</AppBar>
    </header>
  );
};

export default Header;
