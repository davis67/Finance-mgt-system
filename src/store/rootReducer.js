import {
    combineReducers
} from 'redux';

import authReducer from './auth/reducers';
import revenue from './Revenue/reducers';
import expense from './Expense/reducers';
import sale from './Sale/reducers';

export default combineReducers({
    authReducer,
    revenue,
    expense,
    sale
});