import React, { useState } from "react";
import List from "@material-ui/core/List";
import Paper from "@material-ui/core/Paper";
import ListSubheader from "@material-ui/core/ListSubheader";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import CustomListItem from "./list-item";
import ProfileServices from "../services/profile-services";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "10px",
    minHeight: "",
    overflowY: "scroll",
    backgroundColor: theme.palette.background.paper,
    cursor: "default",
  },
  row: {
    cursor: "default",
  },
  msg: {
    color: "#FB0000",
    fontSize: "18px",
    fontWeight: "600",
    margin: "1% 0",
  },
  nestedStyle: {
    cursor: "default",
  },
}));

const Aggregate = ({ aggregate, header }) => {
  const { paper, row, msg, nestedStyle } = useStyles();
  const { sortAggregateProject } = new ProfileServices();
  const [projectsMap] = useState(sortAggregateProject(aggregate.projects));

  return (
    <Paper elevation={2} className={paper} variant="outlined">
      {projectsMap.size ? (
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
          {[...projectsMap.keys()].map((k, index) => (
            <CustomListItem
              key={index}
              value={projectsMap.get(k)}
              isNested={true}
              className={row}
              nestedStyle={nestedStyle}
            />
          ))}
        </List>
      ) : (
        <Typography className={msg} align="center">
          Not projects has been completed yet
        </Typography>
      )}
    </Paper>
  );
};

export default Aggregate;
