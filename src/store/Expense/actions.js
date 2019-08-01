import axios from 'axios';

export const CONSTANTS = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    GET_EXPENSES: 'GET_EXPENSES',
    EXPENSE_LOADING: 'EXPENSE_LOADING',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    GET_ERRORS: 'GET_ERRORS',
};

export const setExpenseLoading = () => ({
    type: CONSTANTS.EXPENSE_LOADING
});

export const clearErrors = () => ({
    type: CONSTANTS.CLEAR_ERRORS
});

export const addExpense = (expenseData, history, id) => dispatch => {
    dispatch(clearErrors());
    axios.post("/expenses/add-expense", expenseData)
        .then(response => {
            dispatch({
                type: CONSTANTS.ADD_EXPENSE,
                payload: response.data
            });

            history.push(`/revenue/view-a-single-revenue/${id}`);
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