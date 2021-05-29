import React from "react";

import NotFoundPage from "./404/404";
import "./error-indicator.css";

const CommonError = () => {
  return (
    <div className="error-indicator">
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent TIGers to fix it)</span>
    </div>
  );
};

const ErrorIndicator = ({ type = "" }) =>
  type === "404" ? <NotFoundPage /> : <CommonError />;

// const NotFoundPage = <img src={_404} alt="404 not found" />;
// const err = type === "404" ? <h1>PAGE WAS NOT FOUND</h1> : general;

export default ErrorIndicator;
