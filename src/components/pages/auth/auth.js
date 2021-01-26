import React from "react";
import Button from "@material-ui/core/Button";

const devUrl =
  "https://git.01.alem.school/login/oauth/authorize/?client_id=d02ae1b0-9b05-4b24-ad87-1ef2a9ea2559&redirect_uri=https://dashboard.alem.school/api/auth/git&response_type=code&state=http://localhost:3000/auth";

const prodUrl =
  "https://git.01.alem.school/login/oauth/authorize/?client_id=d02ae1b0-9b05-4b24-ad87-1ef2a9ea2559&redirect_uri=https://dashboard.alem.school/api/auth/git&response_type=code&state=https://dashboard.alem.school/auth";

const authUrl = process.env.NODE_ENV === "development" ? devUrl : prodUrl;

const styles = {
  cont: {
    height: "90vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
};

const Auth = () => {
  return (
    <div style={styles.cont}>
      <Button variant="outlined" color="primary" href={authUrl}>
        Authorize
      </Button>
    </div>
  );
};

export default Auth;
