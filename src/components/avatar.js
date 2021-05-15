import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import PropTypes from "prop-types";

import not_found from "../assets/img/not_found.png";
import DashboardServices from "../services/dashboard-service";

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
  const { getStudentAvatar } = new DashboardServices();
  const { root, small, large } = useStyles();
  const { login, size, fullName } = props;
  const [image, setImage] = useState(not_found);
  const avatarSize = size === "large" ? large : small;

  useEffect(() => {
    getStudentAvatar(login)
      .then((data) => setImage(`data:image/png;base64, ${data.image}`))
      .catch((e) => setImage(not_found));
  }, []);

  return (
    <div className={root}>
      <Avatar alt={fullName} src={image} className={avatarSize} />
    </div>
  );
}

ImageAvatars.propTypes = {
  login: PropTypes.string.isRequired,
  size: PropTypes.string.isRequired,
  fullName: PropTypes.string.isRequired,
};

export default ImageAvatars;
