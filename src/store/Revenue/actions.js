import axios from 'axios';

export const CONSTANTS = {
    ADD_REVENUE: 'ADD_REVENUE',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    GET_REVENUES_LOADING: 'GET_REVENUES_LOADING',
    GET_REVENUES_SUCCESS: 'GET_REVENUES_SUCCESS',
    GET_REVENUES_ERRORS: 'GET_REVENUES_ERRORS',
    GET_REVENUE: 'GET_REVENUE',
    UPDATE_REVENUE: 'UPDATE_REVENUE',
    DELETE_REVENUE: 'DELETE_REVENUE'

}

// export const setRevenueLoading = () => ({
//     type: CONSTANTS.REVENUE_LOADING
// });

export const clearErrors = () => ({
    type: CONSTANTS.CLEAR_ERRORS
});

export const addRevenue = (revenueData, history) => dispatch => {
    // dispatch(clearErrors());
    axios.post("/revenue/add-revenue", revenueData)
        .then(response => {
            dispatch({
                type: CONSTANTS.ADD_REVENUE,
                payload: response.data
            });
            history.push("/revenue/new");
        })
        .catch(error =>
            dispatch({
                type: CONSTANTS.GET_REVENUE_ERRORS,
                payload: error
            })
        );

}

export const getRevenues = () => dispatch => {
    dispatch({
        type: CONSTANTS.GET_REVENUES_LOADING,
    });
    axios.get("/revenue/index")
        .then(response => {
            dispatch({
                type: CONSTANTS.GET_REVENUES_SUCCESS,
                payload: response.data
            });
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_REVENUES_ERRORS,
                payload: errors
            });
        });
};

export const getRevenue = (id) => dispatch => {
    // dispatch(setRevenueLoading());
    axios.get(`/revenue/view-a-single-revenue/${id}`)
        .then(response =>
            dispatch({
                type: CONSTANTS.GET_REVENUE,
                payload: response.data
            }))
        .catch(error => dispatch({
            type: CONSTANTS.GET_ERRORS,
            payload: null
        }))
}