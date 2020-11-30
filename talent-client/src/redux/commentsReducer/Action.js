import axios from 'axios';
import * as actions from './Constants.js';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function addNewComment(newComment) {
  let URL = `${BACKEND_URL}/comments/folder/${newComment.folderId}/${newComment.userId}`;

  return async (dispatch) => {
    const addComment = await axios.post(URL, {
      content: newComment.content,
      recruiterId: newComment.recruiterId || null,
    });
    dispatch({
      type: actions.ADD_NEW_COMMENT,
      payload: addComment.data,
    });
  };
}

export function getCommentsByFolderId(folderId) {
  return async (dispatch) => {
    const comments = await axios.get(
      `${BACKEND_URL}/comments/folder/${folderId}`
    );
    dispatch({
      type: actions.GET_COMMENTS_BY_FOLDER_ID,
      payload: comments.data,
    });
  };
}

export function editComment(editComment) {
  return async (dispatch) => {
    await axios.put(`${BACKEND_URL}/comments/${editComment.commentId}`, {
      content: editComment.content,
    });
    dispatch({
      type: actions.EDIT_COMMENT,
      payload: editComment,
    });
  };
}

export function deleteComment(deleteCommentId) {
  return async (dispatch) => {
    await axios.delete(`${BACKEND_URL}/comments/${deleteCommentId}`);
    dispatch({
      type: actions.DELETE_COMMENT,
      payload: deleteCommentId,
    });
  };
}
