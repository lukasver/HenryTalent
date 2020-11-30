import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const getAllSkills = () => async (dispatch) => {
  const skills = await axios.get(`${BACKEND_URL}/skills`);
  dispatch({
    type: actions.GET_ALL_SKILLS,
    payload: skills.data,
  });
};

export const editSkill = (id, editedSkill) => async (dispatch) => {
  const resp = await axios.put(`${BACKEND_URL}/skills/${id}`, editedSkill, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  dispatch({
    type: actions.EDIT_SKILL,
  });
  return resp.status;
};

export const deleteSkill = (id) => async (dispatch) => {
  const resp = await axios.delete(`${BACKEND_URL}/skills/${id}`);
  dispatch({
    type: actions.DELETE_SKILL,
  });
  return resp.status;
};
