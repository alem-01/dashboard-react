import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const authUrl =
  "https://git.01.alem.school/login/oauth/authorize/?client_id=d02ae1b0-9b05-4b24-ad87-1ef2a9ea2559&redirect_uri=https://dashboard.alem.school/api/auth/git&response_type=code&state=http://localhost:3000/auth";

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
