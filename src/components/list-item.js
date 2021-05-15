import React, { useState } from "react";
import List from "@material-ui/core/List";
import Collapse from "@material-ui/core/Collapse";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";
import { ExpandLess, ExpandMore } from "@material-ui/icons";

const CustomListItem = ({ value, isNested, nestedStyle }) => {
  const { name, dates, grade } = value;
  const [open, setOpen] = useState(false);
  const isSingle = dates.length === 1;

  const handleClick = () => setOpen(!open);

  const project = name.toUpperCase();

  const statusIcon = (grade) => {
    return Boolean(grade) ? (
      <CheckCircleOutlineIcon style={{ color: "green" }} />
    ) : (
      <CancelOutlinedIcon style={{ color: "red" }} />
    );
  };

  const listOfDate = (
    <>
      <ListItem button onClick={handleClick}>
        <ListItemText primary={project} />
        {open ? <ExpandLess /> : <ExpandMore />}
        {statusIcon(grade)}
      </ListItem>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {dates.map((d, index) => {
            return (
              <ListItem key={index} className={nestedStyle}>
                <ListItemText primary={d.date.split("T")[0]} />
                <ListItemIcon>{statusIcon(d.grade)}</ListItemIcon>
              </ListItem>
            );
          })}
        </List>
      </Collapse>
    </>
  );

  const singleDate = (
    <ListItem>
      <ListItemText primary={project} color="primary" />
      {statusIcon(grade)}
    </ListItem>
  );

  return !isSingle && isNested ? listOfDate : singleDate;
};

export default CustomListItem;
