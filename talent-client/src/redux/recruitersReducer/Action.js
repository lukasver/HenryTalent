import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllRecruiters() {
  return async (dispatch) => {
    const recruiters = await axios.get(`${BACKEND_URL}/recruiters`);
    dispatch({
      type: actions.GET_ALL_RECRUITERS,
      payload: recruiters.data,
    });
  };
}

export function getRecruiterById(id) {
  let recruiter = {};
  return async (dispatch) => {
    if (id) recruiter = await axios.get(`${BACKEND_URL}/recruiters/${id}`);
    dispatch({
      type: actions.GET_RECRUITER,
      payload: Object.keys(recruiter).length ? recruiter.data : recruiter,
    });
  };
}

export function getFoldersByCompany(company) {
  return async (dispatch) => {
    const recruiter = await axios.get(
      `${BACKEND_URL}/recruiters/search/company?company=${company}`
    );
    dispatch({
      type: actions.GET_FOLDERS_BY_COMPANY,
      payload: recruiter.data,
    });
  };
}
