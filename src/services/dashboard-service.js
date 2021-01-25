export default class DashboardServices {
  _apiUrl = "https://dashboard.alem.school/api";

  getData = async (url = "") => {
    const response = await fetch(`${this._apiUrl}${url}`, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    }).catch((err) => {
      console.log(url, err);
    });
    if (response.ok === false) {
      console.log("failed res: ", response);
      window.location.replace("/");
      throw new Error(
        `Couldn't fetch: ${this._apiUrl}${url} status: ${response.status}`
      );
    }
    const body = await response.json();

    return body;
  };

  getAllStudents = async () => {
    const res = await this.getData("/leaderboard");
    return res.standings.map(this._transformStudent);
  };

  getStudentAvatar = async (login) => {
    return await this.fetchStudentInfo(login, "/avatar");
  };

  getProgressInfo = async (login) => {
    const [
      basicInfo, // id, login, first, last name, phone
      aggregate, // xp, audits and all projects[date, name, grade] status(pass, failed, in process)
      audit_ratio, // audits: up, down
      progress, // total_xp by date
      piscine_quests, // all tasks: parent: Quest#, child: task_name, grade
      piscine_exams, // all tasks: parent: exam#, child: task_name, grade(1||0)
      piscine_raids, // all raids: parent(sudoku), attrs: baza04, serzhan, etc.., grade
    ] = await Promise.all([
      this.fetchStudentInfo(login),
      this.fetchStudentInfo(login, "/aggregate"), // all started project, with status(pass, failed, in process)
      this.fetchStudentInfo(login, "/audit_ratio"),
      this.fetchStudentInfo(login, "/progress_bar"),
      this.fetchStudentInfo(login, "/piscine/quests"),
      this.fetchStudentInfo(login, "/piscine/exams"),
      this.fetchStudentInfo(login, "/piscine/raids"),
    ]);
    // need add "/attendance", "/attendance/aggregate" fetching

    return {
      basicInfo,
      aggregate,
      audit_ratio,
      progress,
      piscine_quests,
      piscine_exams,
      piscine_raids,
    };
  };

  fetchStudentInfo = async (login, dataType = "") => {
    return await this.getData(`/user/${login}${dataType}`);
  };

  _transformStudent(student) {
    return {
      // urlLogin: this._extractLogin(student),
      id: student.user_id,
      login: student.login,
      total_xp: student.total_xp,
      generation: student.generation,
    };
  }

  /* _extractLogin(item) {
    console.log("extract : ", item);
    // const loginRegExp = /https:\/\/dashboard\.alem\.school\/api\/user\/([a-zA-z0-9\.\-\_]+)\/?/gm;
    // return item.url.match(loginRegExp)[1];
  } */
}
