import {
    CONSTANTS
} from './actions'

const initialState = {
    revenues: [],
    revenue: {},
    loading: false
};

const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.REVENUE_LOADING:
            return {
                ...state,
                loading: true
            };
        case CONSTANTS.ADD_REVENUE:
            return {
                ...state,
                loading: false,
                    revenues: [...state.revenues, action.payload],
            };
        case CONSTANTS.GET_REVENUES:
            return {
                ...state,
                revenues: action.payload,
                    loading: false
            }
            default:
                return state;
    }
}
export default revenueReducer;