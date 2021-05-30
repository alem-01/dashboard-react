import React from "react";

import "./error-page.css";

const ErrorPage = () => {
  return (
    <div className="code-area">
      <span style={{ color: "#777", fontStyle: "italic" }}>
        // Something has gone terribly wrong...
      </span>
      <span>
        <span style={{ color: "#d65562" }}>if</span>(
        {/* <span style={{ color: "#4ca8ef" }}>!</span> */}
        <span style={{ fontStyle: "italic", color: "#bdbdbd" }}>error</span>)
      </span>
      <span>
        <span style={{ paddingLeft: "15px", color: "#2796ec" }}>
          <i style={{ width: "10px", display: "inline-block" }}></i>throw
        </span>
        <span>
          (<span style={{ color: "white" }}>"(╯°□°)╯︵ ┻━┻"</span>);
        </span>
        <span style={{ display: "block" }}></span>
        <span style={{ color: "#777", fontStyle: "italic" }}>
          // <a href="/leaderboard">Go home!</a>
        </span>
      </span>
    </div>
  );
};

export default ErrorPage;
