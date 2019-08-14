import {
    CONSTANTS
} from './actions';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: false,
    isLoading: true,
    user: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.LOGIN_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                ...action.payload,
                    isAuthenticated: true,
                    isLoading: false
            };

        case CONSTANTS.LOGIN_FAILED:
        case CONSTANTS.LOGOUT_SUCCESS:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                    isAuthenticated: false,
                    isLoading: false
            };
        case CONSTANTS.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                    isLoading: false,
                    user: action.payload
            };

        default:
            return state;
    }
};

export default authReducer;