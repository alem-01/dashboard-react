export const FILTER_USERS = "USERS/FILTER_USERS";

export function initUser(users) {
    
}

export function filterGeneration(users = [], gen = "") {
  if (gen && users.length) {
    const filteredUsers = users.filter((user) => (user.generation = gen));
    return (dispatch) =>
      dispatch({
        type: FILTER_USERS,
        payload: filteredUsers,
      });
  }
}

export function searchUser(users = [], searchKey = "") {
  if (searchKey && users.length) {
    const foundUsers = users.filter((user) => {
      const login = user.login.toLowerCase();
      const key = searchKey.toLowerCase();
      return login.includes(key);
    });
    return (dispatch) => {
      dispatch({
        type: FILTER_USERS,
        payload: foundUsers,
      });
    };
  }
}
