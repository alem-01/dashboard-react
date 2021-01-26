import React, { Component } from "react";
import Container from "@material-ui/core/Container";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Header from "../header";
import GetToken from "../get-token";
import Auth from "../pages/auth";
import Profile from "../pages/profile";
import Leaderboard from "../pages/leaderboard/leaderboard";
import { ErrorBoundry, ErrorIndicator } from "../error";

export default class App extends Component {
  state = {
    clickedUser: null,
    loading: false,
  };

  render() {
    return (
      <ErrorBoundry>
        <Container
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "7vh",
          }}
        >
          <Router>
            <Header />
            <Switch>
              <Route path="/" exact component={Auth} />
              <Route path="/auth" exact component={GetToken} />

              <Route path="/leaderboard" component={Leaderboard} />
              <Route
                path="/profile/:id"
                render={({ match }) => {
                  const { id } = match.params;
                  return <Profile login={id} />;
                }}
              />

              {/* 
              <Route
                path="/profile/:id/piscine"
                exact
                render={({ match }) => {
                  // const { id } = match.params;
                  return (
                    <>
                      // want do universal profile header with basic info
                      <StudentInfo login={id} /> 
                      
                      // then render piscine info
                      <PiscineInfo />
                    </>
                  );
                }}
              /> */}

              <Route render={() => <ErrorIndicator type="404" />} />
            </Switch>
          </Router>
        </Container>
      </ErrorBoundry>
    );
  }
}
