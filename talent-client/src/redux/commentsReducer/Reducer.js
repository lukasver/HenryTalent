import * as actions from './Constants.js';

const initialState = {
  allCommentsByFolderId: [],
};

export default function Reducer(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_NEW_COMMENT:
      return {
        ...state,
        allCommentsByFolderId: [...state.allCommentsByFolderId, action.payload],
      };
    case actions.GET_COMMENTS_BY_FOLDER_ID:
      return {
        ...state,
        allCommentsByFolderId: action.payload,
      };
    case actions.EDIT_COMMENT:
      const editedComment = state.allCommentsByFolderId.find(
        (comment) => comment.id === action.payload.commentId
      );
      editedComment.content = action.payload.content;

      return {
        ...state,
        allCommentsByFolderId: state.allCommentsByFolderId
          .filter((comment) => comment.id !== action.payload.commentId)
          .concat(editedComment),
      };
    case actions.DELETE_COMMENT:
      return {
        ...state,
        allCommentsByFolderId: state.allCommentsByFolderId.filter(
          (comment) => comment.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
