import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function getAllUsers() {
  return async (dispatch) => {
    const users = await axios.get(`${BACKEND_URL}/users`);
    dispatch({
      type: actions.GET_ALL_USERS,
      payload: users.data,
    });
  };
}
