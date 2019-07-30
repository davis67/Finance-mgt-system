import axios from 'axios';

export const CONSTANTS = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    GET_EXPENSES: 'GET_EXPENSES',
    EXPENSE_LOADING: 'EXPENSE_LOADING',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
};

export const setExpenseLoading = () => ({
    type: CONSTANTS.EXPENSE_LOADING
});

export const clearErrors = () => ({
    type: CONSTANTS.CLEAR_ERRORS
});

export const addExpense = (expenseData, history) => dispatch => {
    dispatch(clearErrors());
    axios.post("/expense/add-expense")
        .then(response => {
            dispatch({
                type: CONSTANTS.GET_EXPENSES,
                payload: response.data
            });
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        });
};

// export const getExpenses = (id) => dispatch => {
//     dispatch(setExpenseLoading());
//     axios.get()
//         .then(response)
// }