import React, { Component, useState } from "react";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core";

import DashboardServices from "../../../services/dashboard-service";
import { ErrorIndicator } from "../../error";
import Spinner from "../../spinner";
import Aggregate from "../../aggregate";
import StudentCard from "../../studentcard";
import PiscineInfo from "../piscine/piscine";
import ProgressGraph from "../../progress-graph";
import CalendarCont from "../../calendar";

export default class Profile extends Component {
  dashboardService = new DashboardServices();

  state = {
    student: {},
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.updateProfile();
  }

  onStudentLoaded(student) {
    this.setState({
      student,
      loading: false,
      error: false,
    });
  }

  onError = (err) => {
    this.setState({
      error: true,
      loading: false,
    });
  };

  updateProfile() {
    const { login } = this.props;
    this.dashboardService
      .getProgressInfo(login)
      .then((data) => {
        this.onStudentLoaded(data);
        this.setState({ loading: false });
      })
      .catch(this.onError);
  }

  render() {
    const { student, loading, error } = this.state;
    const hasData = !(loading || error);
    const errorMessage = error ? <ErrorIndicator /> : null;
    const spinner = loading ? <Spinner /> : null;
    const content = hasData ? <StudentProfile student={student} /> : null;

    //  className="profile"
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
  root: {
    padding: "2%",
    display: "grid",
    gridTemplateColumns: "2fr 3.5fr",
    justifyContent: "spase-around",
  },
  left: { paddingTop: "10px" },
  right: { paddingTop: "10px" },
}));

const StudentProfile = ({ student }) => {
  const {
    basicInfo,
    aggregate,
    progress,
    audit_ratio,
    // piscine_quests,
    // piscine_exams,
    // piscine_raids,
  } = student;
  const { root, left, right } = useStyles();
  const [renderData, setRenderData] = useState("div01");

  const info =
    renderData === "div01" ? (
      <Aggregate aggregate={aggregate} />
    ) : (
      <PiscineInfo />
    );

  return (
    <Paper className={root}>
      <Container className={left}>
        <StudentCard
          student={basicInfo}
          audits={audit_ratio}
          renderSwitch={setRenderData}
        />
        <CalendarCont />
      </Container>

      <Container className={right}>
        <ProgressGraph progress={progress} />
        {info}
      </Container>
    </Paper>
  );
};
