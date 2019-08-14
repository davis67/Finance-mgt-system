import axios from 'axios';
import setAuthToken from '../../components/auth/setAuthToken';

export const CONSTANTS = {
    USER_LOADED: 'USER_LOADED',
    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAILED: 'LOGIN_FAILED',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS'
};

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const response = await axios.get('/auth/authenticated');
        dispatch({
            type: CONSTANTS.USER_LOADED,
            payload: response.data
        })
    } catch (error) {
        dispatch({
            type: CONSTANTS.LOGIN_FAILED
        })
    }
}

export const userLogin = logindata => async dispatch => {
    try {
        const response = await axios.post('/auth/login', logindata);
        dispatch({
            type: CONSTANTS.LOGIN_SUCCESS,
            payload: response.data
        });
    } catch (error) {
        dispatch({
            type: CONSTANTS.LOGIN_FAILED,
            error: error
        });
    }
}

export const logoutUser = () => dispatch => {
    dispatch({
        type: CONSTANTS.LOGOUT_SUCCESS
    });
};