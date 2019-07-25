import { combineReducers } from 'redux';
import user from './users/reducer';
import auth from './auth/reducer';

export default combineReducers({
  user,
  auth
 
});