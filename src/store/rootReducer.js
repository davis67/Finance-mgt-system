import {
    combineReducers
} from 'redux';

import authReducer from './auth/reducers';
import revenue from './Revenue/reducers';
export default combineReducers({
    authReducer,
    revenue
});