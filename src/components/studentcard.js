import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Avatar from "./avatar";

const useStyles = makeStyles({
  root: {
    minWidth: 255,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const StudentCard = ({ student, audits, renderSwitch }) => {
  const { login, first_name, last_name, tel } = student;
  const { up, down } = audits;
  const { root, title, pos } = useStyles();

  return (
    <Paper variant="outlined" className={root}>
      <CardContent>
        <Avatar login={login} fullName={first_name + last_name} size="large" />

        <Typography className={title} color="textSecondary" gutterBottom>
          {login}
        </Typography>
        <Typography variant="h5" component="h2">
          {first_name + " " + last_name}
        </Typography>
        <Typography className={pos} color="textSecondary">
          {tel}
        </Typography>
        <Typography className={title} color="textSecondary" gutterBottom>
          audits
        </Typography>
        <Typography variant="body2" component="p">
          up: {up} down: {down}
        </Typography>
      </CardContent>
    </Paper>
  );
};

export default StudentCard;
