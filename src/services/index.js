function humanFileSize(bytes, si = false, dp = 1) {
  const thresh = si ? 1000 : 1024;

  if (Math.abs(bytes) < thresh) {
    return bytes + " B";
  }

  const units = si
    ? ["kB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"]
    : ["KiB", "MiB", "GiB", "TiB", "PiB", "EiB", "ZiB", "YiB"];
  let u = -1;
  const r = 10 ** dp;

  do {
    bytes /= thresh;
    ++u;
  } while (
    Math.round(Math.abs(bytes) * r) / r >= thresh &&
    u < units.length - 1
  );

  return bytes.toFixed(dp) + " " + units[u];
}

function convertXp(students) {
  return students.map((student) => {
    const new_student = {
      ...student,
      id: student.login,
      total_xp: humanFileSize(student.total_xp),
    };
    return new_student;
  });
}

function strToFloat(strXp) {
  return strXp.map((xp) => Number.parseFloat(xp));
}

function getMaxXp(xpArr, needConvert = false) {
  if (needConvert) xpArr = strToFloat(xpArr);
  return Math.max(...xpArr);
}

export { convertXp, getMaxXp, humanFileSize };

// const url = "https://dashboard.alem.school/api/leaderboard";
// const authUrl =
//   "https://git.01.alem.school/login/oauth/authorize/?client_id=d02ae1b0-9b05-4b24-ad87-1ef2a9ea2559&redirect_uri=https://dashboard.alem.school/api/auth/git&response_type=code&state=http://localhost:3000/v3";

/* function getAllStudents() {
  const students = [];
  customFetch(url)
    .then((response) => response.json())
    .then((data) => {
      students = convertXp(data.standings);
      console.log("in getAllStudents:", students);
      return students;
    });
} 
*/

/* 
function customFetch(url = authUrl, func = fetch) {
  const fetchPromise = func(url, {
    credentials: "include",
  }).then((response) => {
    if (response.status >= 400) {
      window.location.replace("/");
      throw new Error(response.statusText);
    }
    return response;
  });

  return fetchPromise;
}
*/
