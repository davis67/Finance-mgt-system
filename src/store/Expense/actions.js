import axios from 'axios';
import constants from 'jest-haste-map/build/constants';

export const CONSTANTS = {
    ADD_EXPENSE: 'ADD_EXPENSE',
    GET_EXPENSES: 'GET_EXPENSES',
    GET_EXPENSE: 'GET_EXPENSE',
    EXPENSE_LOADING: 'EXPENSE_LOADING',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    UPDATE_EXPENSE: 'UPDATE_EXPENSE',
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
export const getExpense = (id) => dispatch => {
    dispatch(setExpenseLoading());
    axios.get(`/expenses/${id}`)
        .then(response => {
            dispatch({
                type: CONSTANTS.GET_EXPENSE,
                payload: response.data
            })
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        })
}
export const editExpense = (data, history, id, revenueId) => dispatch => {
    dispatch(setExpenseLoading());

    //come back to me after updating the api
    axios.put(`/expenses/edit/${id}`, data)
        .then(response => {
            dispatch({
                type: constants.UPDATE_EXPENSE,
                payload: response.data
            });
            history.push(`/revenue/view-a-single-revenue/${revenueId}`);
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        });
}