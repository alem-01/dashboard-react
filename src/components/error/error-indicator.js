import React from "react";

import NotFoundPage from "./404/404";
import ErrorPage from "./error-page/error-page";

/* const CommonError = () => {
  return (
    <div className="error-indicator">
      <span className="boom">BOOM!</span>
      <span>something has gone terribly wrong</span>
      <span>(but we already sent TIGers to fix it)</span>
    </div>
  );
}; */

const ErrorIndicator = ({ type = "" }) =>
  type === "404" ? <NotFoundPage /> : <ErrorPage />;

export default ErrorIndicator;
