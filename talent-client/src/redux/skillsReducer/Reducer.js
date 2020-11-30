import * as actions from './Constants.js';

const initialState = {
  allSkills: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_SKILLS:
      return {
        ...state,
        allSkills: action.payload,
      };
    case actions.EDIT_SKILL:
      return state;
    case actions.DELETE_SKILL:
      return state;
    default:
      return state;
  }
}
