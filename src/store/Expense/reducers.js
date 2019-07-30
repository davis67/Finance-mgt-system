import {
    CONSTANTS
} from './actions'

const initialState = {
    expenses: [],
    expense: {},
    loading: false
};

const expenseReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.EXPENSE_LOADING:
            return {
                ...state,
                loading: true
            };
        case CONSTANTS.ADD_EXPENSE:
            return {
                ...state,
                loading: false,
                    expenses: [...state.expenses, action.payload]
            }
            default:
                return state;
    }
}

export default expenseReducer;