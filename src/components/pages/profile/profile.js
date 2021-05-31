import React, { Component, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

import DashboardServices from "../../../services/dashboard-service";
import ErrorIndicator from "../../error/error-indicator";
import Spinner from "../../spinner/spinner";
import Aggregate from "../../aggregate";
import PiscineInfo from "../piscine/piscine";
import ProgressGraph from "../../progress-graph";
import StudentCard from "./studentcard";
import CalendarCont from "./calendar/calendar";

export default class Profile extends Component {
  dashboardService = new DashboardServices();

  state = {
    projects: {},
    loading: true,
    error: null,
  };

  componentDidMount = () => this.updateProfile();

  onStudentLoaded(projects) {
    this.setState({
      projects,
      loading: false,
      error: null,
    });
  }

  onError = (err) => {
    this.setState({
      progress: {},
      error: err,
      loading: false,
    });
  };

  async updateProfile() {
    const { login } = this.props;
    this.dashboardService
      .getProgressInfo(login)
      .then((data) => {
        const { basicInfo, aggregate } = data;
        if (basicInfo && aggregate) this.onStudentLoaded(data);
        else this.onError("404");
      })
      .catch(this.onError);
  }

  render() {
    const { projects, loading, error } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator type={error} /> : null; // can send error message to component
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <StudentProfile projects={projects} /> : null;

    return (
      <>
        {errorMessage}
        {spinner}
        {content}
      </>
    );
  }
}
const useStyles = makeStyles((theme) => ({
  paper: {
    padding: "1rem auto",
    display: "flex",
    justifyContent: "spase-around",
    minWidth: "90%",
    minHeight: "90vh",
  },
  left: {
    padding: "1rem",
    minWidth: "40%",
  },
  right: {
    padding: "1rem",
    minWidth: "60%",
  },

  [theme.breakpoints.up("md")]: {
    paper: {
      maxWidth: "1200px",
    },
    left: {
      minWidth: "350px",
      maxWidth: "360px",
    },
  },
  [theme.breakpoints.down("sm")]: {
    paper: { display: "block" },
    left: { width: "100%", paddingBottom: "0" },
    right: { width: "100%", paddingTop: "1rem" },
    calendar: {
      display: "none",
    },
  },
}));

const StudentProfile = ({ projects }) => {
  const { basicInfo, aggregate, progress, audit_ratio } = projects;
  const { paper, left, right, calendar } = useStyles();
  const [renderData, setRenderData] = useState("div01");

  const info =
    renderData === "div01" ? (
      <Aggregate aggregate={aggregate} />
    ) : (
      <PiscineInfo />
    );

  return (
    <Paper className={paper}>
      <Container className={left}>
        <StudentCard
          student={basicInfo}
          audits={audit_ratio}
          renderSwitch={setRenderData}
        />
        <div className={calendar}>
          <CalendarCont />
        </div>
      </Container>

      <Container className={right}>
        <ProgressGraph progress={progress} />
        {info}
      </Container>
    </Paper>
  );
};
