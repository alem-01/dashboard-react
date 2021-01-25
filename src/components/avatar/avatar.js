import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";

import DashboardServices from "../../services/dashboard-service";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: "1em auto",
    },
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  large: {
    width: theme.spacing(23),
    height: theme.spacing(23),
  },
}));

function ImageAvatars(props) {
  const dashboardServices = new DashboardServices();
  const classes = useStyles();
  const { login, size, fullName } = props;
  const [image, setImage] = useState(null);
  const imgSrc = `data:image/png;base64, ${image}`;
  const avatarSize = size === "large" ? classes.large : classes.small;

  useEffect(() => {
    dashboardServices
      .getStudentAvatar(login)
      .then((data) => {
        setImage(data.image);
      })
      .catch((e) => console.log("ava fetching err", e));
  }, []);

  return (
    <div className={classes.root}>
      <Avatar alt={fullName} src={imgSrc} className={avatarSize} />
    </div>
  );
}

ImageAvatars.propTypes = {
  login: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default ImageAvatars;
