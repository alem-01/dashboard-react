import { FILTER_USERS } from "./actions";
const initialState = {
  filteredUsers: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_USERS:
      return {
        filteredUsers: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
