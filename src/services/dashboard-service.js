export default class DashboardServices {
  _apiUrl = "https://dashboard.alem.school/api";

  getData = async (url = "", redirect = true) => {
    const response = await fetch(`${this._apiUrl}${url}`, {
      headers: {
        // mode: "cors",
        // method: "GET",
        Authorization: localStorage.getItem("token"),
      },
    });

    if (!response.ok && redirect) {
      console.log("failed res: ", response);
      if (redirect) window.location.replace("/");
      throw new Error(
        `Couldn't fetch: ${this._apiUrl}${url} status: ${response.status}`
      );
    }
    return await response.json();
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

  getAllStudents = async () => {
    const res = await this.getData("/leaderboard");
    return res.standings.map(this._transformStudent);
  };

  getStudentAvatar = async (login) => {
    return await this.getData(`/user/${login}/avatar`, false);
  };

  getProgressInfo = async (login) => {
    const [
      basicInfo, // id, login, first, last name, phone
      aggregate, // xp, audits and all projects[date, name, grade] status(pass, failed, in process)
      audit_ratio, // audits: up, down
      progress, // total_xp by date
    ] = await Promise.all([
      this.getData(`/user/${login}`),
      this.getData(`/user/${login}/aggregate`),
      this.getData(`/user/${login}/audit_ratio`),
      this.getData(`/user/${login}/progress_bar`),
    ]);
    // need add "/attendance", "/attendance/aggregate" fetching

    return {
      basicInfo,
      aggregate,
      audit_ratio,
      progress,
    };
  };

  getPiscineInfo = async (login) => {
    const [
      piscine_quests, // all tasks: parent: Quest#, child: task_name, grade
      piscine_exams, // all tasks: parent: exam#, child: task_name, grade(1||0)
      piscine_raids, // all raids: parent(sudoku), attrs: baza04, serzhan, etc.., grade
    ] = await Promise.all([
      this.getData(`/user/${login}/piscine/quests`),
      this.getData(`/user/${login}/piscine/exams`),
      this.getData(`/user/${login}/piscine/raids`),
    ]);
    return { piscine_quests, piscine_exams, piscine_raids };
  };

  /* _extractLogin(item) {
    console.log("extract : ", item);
    // const loginRegExp = /https:\/\/dashboard\.alem\.school\/api\/user\/([a-zA-z0-9\.\-\_]+)\/?/gm;
    // return item.url.match(loginRegExp)[1];
  } */
}
