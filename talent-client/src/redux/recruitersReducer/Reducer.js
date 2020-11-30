import * as actions from './Constants.js';

const initialState = {
  allRecruiters: [],
  foldersFromRecruiter: {},
  recruiter: {},
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_ALL_RECRUITERS:
      return {
        ...state,
        allRecruiters: action.payload,
      };
    case actions.GET_RECRUITER:
      return {
        ...state,
        recruiter: action.payload,
      };
    case actions.GET_FOLDERS_BY_COMPANY:
      return {
        ...state,
        foldersFromRecruiter: action.payload,
      };
    default:
      return state;
  }
}
