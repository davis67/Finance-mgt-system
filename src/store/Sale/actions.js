import axios from 'axios';

export const CONSTANTS = {
    ADD_SALE: 'ADD_SALE',
    GET_SALES: 'GET_SALES',
    GET_SALE: 'GET_SALE',
    SALE_LOADING: 'SALE_LOADING',
    CLEAR_ERRORS: 'CLEAR_ERRORS',
    UPDATE_SALE: 'UPDATE_SALE',
    DELETE_SALE: 'DELETE_SALE',
    GET_ERRORS: 'GET_ERRORS'
};

export const setSalesLoading = () => ({
    type: CONSTANTS.SALE_LOADING
});
export const clearErrors = () => ({
    type: CONSTANTS.CLEAR_ERRORS
});


//get sales
export const getSales = (id) => async dispatch => {
    dispatch({
        type: CONSTANTS.GET_SALES,
    });
    await axios.get(`/sales/revenue/${id}`)
        .then(response =>
            dispatch({
                type: CONSTANTS.GET_SALES,
                payload: response.data
            }))
        .catch(error => dispatch({
            type: CONSTANTS.GET_ERRORS,
            payload: error
        }))
};


export const addSale = (saleData, history, id) => dispatch => {
    dispatch(clearErrors());
    axios.post("/sales/add-sale", saleData)
        .then(response => {
            dispatch({
                type: CONSTANTS.ADD_SALE,
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

//get sale

export const getSale = (id) => dispatch => {
    dispatch(setSalesLoading());
    axios.get(`/sales/${id}`)
        .then(response => {
            dispatch({
                type: CONSTANTS.GET_SALE,
                payload: response.data
            })
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        })
};

//edit sale

export const editExpense = (data, history, id, revenueId) => dispatch => {
    dispatch(setSalesLoading());

    axios.put(`/sales/edit/${id}`, data)
        .then(response => {
            dispatch({
                type: CONSTANTS.UPDATE_SALE,
                payload: response.data
            })

            history.push(`/revenue/view-a-single-revenue/${revenueId}`);
        })
        .catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        });
};

//delete sales
export const deleteSale = (id, history, revenueId) => dispatch => {
    axios.delete(`/sales/delete/${id}`)
        .then(response => {
            dispatch({
                type: CONSTANTS.DELETE_SALE,
                payload: id
            });
            history.push(`/revenue/view-a-single-revenue/${revenueId}`)
        }).catch(errors => {
            dispatch({
                type: CONSTANTS.GET_ERRORS,
                payload: null
            });
        });
};