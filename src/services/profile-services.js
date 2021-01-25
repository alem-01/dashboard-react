export default class ProfileServices {
  sortAggregateProject = (projs) => {
    projs = projs.sort(function (a, b) {
      if (a.created_at < b.created_at) return 1;
      if (a.created_at > b.created_at) return -1;
      return 0;
    });

    // Object { created_at: "2020-10-11T16:57:31.182468Z", name: "ascii-art-output", grade: 0 }

    const pMap = new Map();
    let tempObject = {};

    projs.map((proj) => {
      if (pMap.has(proj.name)) {
        tempObject = pMap.get(proj.name);

        pMap.set(proj.name, {
          ...tempObject,
          name: proj.name,
          grade: tempObject.grade >= proj.grade ? tempObject.grade : proj.grade,
          dates: [
            ...tempObject.dates,
            { date: proj.created_at, grade: proj.grade },
          ],
        });

        tempObject = {};
      } else {
        pMap.set(proj.name, {
          name: proj.name,
          grade: proj.grade,
          dates: [{ date: proj.created_at, grade: proj.grade }],
        });
      }
    });

    // for (let val of pMap.values()) {
    //   console.log("val of map: ", val);
    // }

    return pMap;
  };
}
