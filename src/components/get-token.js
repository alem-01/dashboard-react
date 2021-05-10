import React, { Component } from "react";
import { Redirect } from "react-router-dom";

export default class GetToken extends Component {
  state = { is_loaded: false };
  componentDidMount() {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    localStorage.setItem("token", token);
    setTimeout(() => {
      this.setState({
        is_loaded: true,
      });
    }, 300);
  }
  render() {
    if (this.state.is_loaded) return <Redirect to="/leaderboard" />;

    return <div></div>;
  }
}