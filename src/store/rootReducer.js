import {
    combineReducers
} from 'redux';

import authReducer from './auth/reducers';
import revenue from './Revenue/reducers';
import expense from './Expense/reducers'
export default combineReducers({
    authReducer,
    revenue,
    expense
});