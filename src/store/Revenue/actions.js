import axios from 'axios';

export const CONSTANTS = {
    ADD_REVENUE: 'ADD_REVENUE',
    GET_ERRORS: 'GET_ERRORS',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    GET_REVENUES: 'GET_REVENUES',
    GET_REVENUE: 'GET_REVENUE',
    REVENUE_LOADING: 'REVENUE_LOADING',
    UPDATE_REVENUE: 'UPDATE_REVENUE',
    DELETE_REVENUE: 'DELETE_REVENUE'

}

export const setRevenueLoading = () => ({
    type: CONSTANTS.REVENUE_LOADING
});

export const clearErrors = () => ({
    type: CONSTANTS.CLEAR_ERRORS
});

export const addRevenue = (revenueData, history) => dispatch => {
    dispatch(clearErrors());
    axios.post("/revenue/add-revenue", revenueData)
        .then(response => {
            dispatch({
                type: CONSTANTS.ADD_REVENUE,
                payload: response.data
            });
            history.push("/revenue/new");
        })
        .catch(err =>
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            })
        );

}

export const getRevenues = () => dispatch => {
    dispatch(setRevenueLoading());
    axios.get("/revenue/index")
        .then(response => {
            dispatch({
                type: CONSTANTS.GET_REVENUES,
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