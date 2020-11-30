import * as actions from './Constants.js';

const initialState = {
  allCandidates: [],
  allListedCandidates: [],
  candidate: {},
  bulkedCandidates: [],
  filterCandidates: [],
  pagedCandidates: [],
  pageStats: {},
  lastFilteredData: null,
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.GET_CANDIDATES_PAGE:
      return {
        ...state,
        pagedCandidates: action.payload,
        pageStats: action.data,
      };
    case actions.GET_ALL_CANDIDATES:
      return {
        ...state,
        allCandidates: action.payload,
        allListedCandidates: action.listed,
      };
    case actions.DELETE_CANDIDATE:
      return {
        ...state,
        allCandidates: state.allCandidates.filter(
          (candidate) => candidate.id !== action.payload
        ),
      };
    case actions.GET_CANDIDATE_BY_ID:
      return {
        ...state,
        candidate: action.payload,
      };
    case actions.UPDATE_CANDIDATE:
      return {
        ...state,
        allCandidates: state.allCandidates
          .filter((candidate) => candidate.id !== action.payload.id)
          .concat(action.payload),
      };
    case actions.BULK_CANDIDATES:
      return {
        ...state,
        bulkedCandidates: action.payload,
      };
    case actions.GET_CANDIDATE_FILTER:
      let aux = { ...state.pageStats };
      return {
        ...state,
        filterCandidates: !action.payload.length ? [] : action.payload,
        pageStats: action.data || aux,
        lastFilteredData: action.filterData,
      };
    default:
      return state;
  }
}
