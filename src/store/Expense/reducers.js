import {
    CONSTANTS
} from './actions'

const initialState = {
    expenses: [],
    expense: {},
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
            }
            case CONSTANTS.UPDATE_EXPENSE:
                return {
                    ...state,
                    updateExpense: action.payload.success
                }
                case CONSTANTS.GET_ERRORS:
                    return {
                        ...state,
                        loading: false,
                            error: action.error
                    }
                    default:
                        return state;
    }
}

export default expenseReducer;