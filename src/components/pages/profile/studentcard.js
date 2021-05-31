import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

import Avatar from "../../avatar";

const useStyles = makeStyles((theme) => ({
  paper: {
    minWidth: 255,
  },
  title: {
    fontSize: 14,
  },
  phone: {
    marginBottom: 12,
  },
}));

const StudentCard = ({ student, audits, renderSwitch }) => {
  const { login, first_name, last_name, tel } = student;
  const { up, down } = audits;
  const { paper, title, phone } = useStyles();

  return (
    <Paper variant="outlined" className={paper}>
      <CardContent>
        <Avatar login={login} fullName={first_name + last_name} size="large" />
        <Typography className={title} color="textSecondary" gutterBottom>
          {login}
        </Typography>
        <Typography variant="h6" component="h2">
          {first_name + " " + last_name}
        </Typography>
        <Typography className={phone} color="textSecondary">
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
