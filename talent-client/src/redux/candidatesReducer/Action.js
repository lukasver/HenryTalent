import axios from 'axios';
import * as actions from './Constants.js';
import { candidatesPerPage } from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllCandidates() {
  return async (dispatch) => {
    const candidates = await axios.get(`${BACKEND_URL}/candidates`);
    const listedCandidates = candidates.data.filter(
      (candidate) => candidate.visibility === 'listed'
    );
    dispatch({
      type: actions.GET_ALL_CANDIDATES,
      payload: candidates.data,
      listed: listedCandidates,
    });
  };
}

export function getCandidatesPage(currentPage, limit) {
  return async (dispatch) => {
    const candidates = await axios.get(
      `${BACKEND_URL}/candidates/pages?limit=${
        limit || candidatesPerPage
      }&page=${currentPage - 1 || 0}`
    );
    const { candidatesInPage, totalPages } = candidates.data;
    dispatch({
      type: actions.GET_CANDIDATES_PAGE,
      payload: candidates.data.candidates.rows,
      data: { candidatesInPage, totalPages },
    });
  };
}

export function deleteCandidate(id) {
  return async (dispatch) => {
    await axios.delete(`${BACKEND_URL}/candidates/${id}/delete`);
    dispatch({
      type: actions.DELETE_CANDIDATE,
      payload: id,
    });
  };
}

export function getCandidateById(id) {
  return async (dispatch) => {
    const candidate = await axios.get(`${BACKEND_URL}/candidates/${id}`);
    dispatch({
      type: actions.GET_CANDIDATE_BY_ID,
      payload: candidate.data,
    });
  };
}

export function updateCandidate(candidateData) {
  return async (dispatch) => {
    await axios.put(
      `${BACKEND_URL}/candidates/${candidateData.id}/update`,
      candidateData
    );
    dispatch({
      type: actions.UPDATE_CANDIDATE,
      payload: candidateData,
    });
  };
}

export const bulkCandidates = (jsonCandidates) => async (dispatch) => {
  const bulkedCandidates = await axios.post(
    `${BACKEND_URL}/candidates`,
    jsonCandidates
  );
  dispatch({
    type: actions.BULK_CANDIDATES,
    payload: bulkedCandidates.data,
  });
};

export function getFilterCandidates(filter, page = 0) {
  if (page !== 0) page = page - 1;
  const query_params = Object.keys(filter)
    .filter((key) => filter[key].length)
    .map((key) => key + '=' + filter[key])
    .join('&');
  return async (dispatch) => {
    const candidates = await axios.get(
      `${BACKEND_URL}/candidates/filter${
        query_params
          ? '?' + query_params.replace(/,/g, '%2C') + '&page=' + page
          : ''
      }`
    );
    const { candidatesInPage, currentPage, totalPages } = candidates.data;
    const idCandidates = !candidates.data.candidates
      ? []
      : candidates.data.candidates;
    dispatch({
      type: actions.GET_CANDIDATE_FILTER,
      payload: idCandidates,
      data: { candidatesInPage, currentPage, totalPages },
      filterData: filter,
    });
  };
}
