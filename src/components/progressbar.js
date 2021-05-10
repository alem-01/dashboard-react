import React from "react";
import PropTypes from "prop-types";
import { LinearProgress } from "@material-ui/core";

const ProgressBar = (props) => {
  const { current, MIN = 0, MAX } = props;
  const normalize = (value) => ((value - MIN) * 100) / (MAX - MIN);

  return (
    <React.Fragment>
      <LinearProgress variant="determinate" value={normalize(current)} />
    </React.Fragment>
  );
};

ProgressBar.propTypes = {
  current: PropTypes.number.isRequired,
  MAX: PropTypes.number.isRequired,
  MIN: PropTypes.number,
};

export default ProgressBar;