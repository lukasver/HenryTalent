import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import ExampleReducer from './exampleReducer/Reducer';
import CandidateReducer from './candidatesReducer/Reducer';
import FolderReducer from './foldersReducer/Reducer';
import RecruitersReducer from './recruitersReducer/Reducer';
import UsersReducer from './usersReducer/Reducer';
import SkillsReducer from './skillsReducer/Reducer';
import CommentsReducer from './commentsReducer/Reducer';
// IMPORT ALL YOUR CUSTOM REDUCERS TO THIS FILE AND ADD THEM TO THE rootReducer obj below.

// Adding of REDUX DEVTOOLS
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// Mergin several reducers into one, if you want to add more reducers, just add them here...
const rootReducer = combineReducers({
  ExampleReducer,
  CandidateReducer,
  FolderReducer,
  RecruitersReducer,
  UsersReducer,
  SkillsReducer,
  CommentsReducer,
});

export const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
