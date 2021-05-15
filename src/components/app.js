import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import Header from "./header";
import GetToken from "./get-token";
import Auth from "./pages/auth/auth";
import Profile from "./pages/profile/profile";
import Leaderboard from "./pages/leaderboard/leaderboard";
import { ErrorBoundry, ErrorIndicator } from "./error";

export default class App extends Component {
  state = {
    clickedUser: null,
    loading: false,
  };

  theme = createMuiTheme({
    palette: {
      type: "dark",
      background: {
        paper: "#1F1F1F",
      },
    },
    typography: {
      fontFamily: ["pt-root-ui", "serif"].join(","),
    },
  });

  render() {
    return (
      <ThemeProvider theme={this.theme}>
        <CssBaseline />
        <ErrorBoundry>
          <Router>
            <Header />
            <Container style={{ marginTop: "5rem", marginBottom: "1rem" }}>
              <Switch>
                <Route path="/" exact component={Auth} />
                <Route path="/auth" exact component={GetToken} />
                <Route path="/leaderboard" component={Leaderboard} />

                <Route
                  path="/profile/:id"
                  render={({ match }) => <Profile login={match.params.id} />}
                />

                <Route render={() => <ErrorIndicator type="404" />} />
              </Switch>
            </Container>
          </Router>
        </ErrorBoundry>
      </ThemeProvider>
    );
  }
}
