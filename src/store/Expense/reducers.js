import {
    CONSTANTS
} from './actions'

const initialState = {
    expenses: [],
    expense: {},
    // count:null,
    loading: false,
    error: {}
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
            };
        case CONSTANTS.GET_EXPENSE:
            return {
                ...state,
                expense: action.payload,
                    loading: false
            }
            case CONSTANTS.UPDATE_EXPENSE:
                return {
                    ...state,
                    updateExpense: action.payload.success,
                        loading: false
                };
            case CONSTANTS.DELETE_EXPENSE:
                return {
                    ...state,
                    expense: state.expenses.filter(singleexpense => singleexpense._id !== action.payload)
                }
                case CONSTANTS.GET_ERRORS:
                    return {
                        ...state,
                        loading: false,
                            error: action.error
                    };
                default:
                    return state;
    }
}

export default expenseReducer;