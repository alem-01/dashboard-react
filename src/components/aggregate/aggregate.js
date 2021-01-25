import React, { useState } from "react";
import Collapse from "@material-ui/core/Collapse";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListSubheader from "@material-ui/core/ListSubheader";
import { ExpandLess, ExpandMore } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";
import CancelOutlinedIcon from "@material-ui/icons/CancelOutlined";
import CheckCircleOutlineIcon from "@material-ui/icons/CheckCircleOutline";

import ProfileServices from "../../services/profile-services";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: "10px",
    maxHeight: "53vh",
    overflowY: "scroll",
    // padding: "3%",
    // width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
  row: {
    // width: "100%",
  },
  nestedStyle: {
    paddingLeft: theme.spacing(4),
  },
}));

const Aggregate = ({ aggregate, header }) => {
  const { projects } = aggregate;
  const profileServices = new ProfileServices();
  const [projectsMap] = useState(
    profileServices.sortAggregateProject(projects)
  );
  const { root, row } = useStyles();

  return (
    <Paper elevation={2} className={root} variant="outlined">
      <List
        component="nav"
        aria-labelledby="nested-list-subheader"
        subheader={
          //need to mode to p or span to do align
          <ListSubheader component="div" id="nested-list-subheader">
            {/*maybe not need render total_xp in case of piscine */}
            {/*Div 01 total XP incorrect  {humanFileSize(total_xp)} */}
          </ListSubheader>
        }
      >
        {[...projectsMap.keys()].map((k) => (
          <Li key={k} proj={projectsMap.get(k)} nested={true} className={row} />
        ))}
      </List>
    </Paper>
  );
};

// need to move to separate component
const Li = ({ proj, nested }) => {
  const { name, dates, grade } = proj;
  const [open, setOpen] = useState(false);
  const isSingle = dates.length === 1;
  const { nestedStyle } = useStyles();

  const handleClick = () => setOpen(!open);

  const project = name.toUpperCase();

  const statusIcon = (grade) => {
    return Boolean(grade) ? (
      <CheckCircleOutlineIcon style={{ color: "green" }} />
    ) : (
      <CancelOutlinedIcon style={{ color: "red" }} />
    );
  };

  const getDate = (renderDate, grade) => {
    return (
      <ListItem key={renderDate} button className={nestedStyle}>
        <ListItemText primary={renderDate} />
        <ListItemIcon>{statusIcon(grade)}</ListItemIcon>
      </ListItem>
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
          {dates.map((d) => getDate(d.date.split("T")[0], d.grade))}
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

  return !isSingle && nested ? listOfDate : singleDate;
};

export default Aggregate;
