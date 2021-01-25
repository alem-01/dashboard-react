import React from "react";

import "./error-indicator.css";
import icon from "./error.png";
import _404 from "./404.png";

// const styles = {
//   container: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// };

const ErrorIndicator = ({ type = "" }) => {
  const general = (
    <div className="error-indicator">
      <img src={icon} alt="error icon" />
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent TIGers to fix it)</span>
    </div>
  );

  const notFound = <img src={_404} alt="404 not found" />;
  const err = type === "404" ? notFound : general;

  return err;
};

export default ErrorIndicator;
