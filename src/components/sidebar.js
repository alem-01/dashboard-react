import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
// import CloseIcon from "@material-ui/icons/Close";

export default function SideBar(props) {
  const { links, linkType, children } = props;
  const [isOpen, setIsOpen] = useState(false);

  const toggleDrawer =
    (open = false) =>
    ({ type, key }) => {
      if (type === "keydown" && (key === "Tab" || key === "Shift")) return;
      setIsOpen(open);
    };

  const list = () => (
    <div
      style={{ width: "250px" }}
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
    >
      <List>
        <ListItem
          button
          key={links[0].label}
          {...linkType(links[0].type, links[0].href)}
        >
          <ListItemText primary={links[0].label} />
        </ListItem>
      </List>
      <Divider />
      <List>
        {links.slice(1).map(({ label, href, type }, index) => (
          <ListItem button key={label} {...linkType(type, href)}>
            <ListItemText primary={label} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <React.Fragment key="left">
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon />
        {children}
      </Button>
      <Drawer anchor="left" open={isOpen} onClose={toggleDrawer()}>
        {list()}
      </Drawer>
    </React.Fragment>
  );
}
