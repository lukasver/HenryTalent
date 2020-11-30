import * as actions from './Constants.js';

const initialState = {
  allUsers: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };
    default:
      return state;
  }
}
