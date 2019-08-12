import {
    CONSTANTS
} from './actions'

const initialState = {
    revenues: [],
    revenue: {},
    count: null,
    loading: false,
    error: null
};

const revenueReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.GET_REVENUES_LOADING:
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
        case CONSTANTS.GET_REVENUES_SUCCESS:
            return {
                ...state,
                revenues: action.payload,
                    count: action.payload.length,
                    loading: false
            }
            case CONSTANTS.GET_REVENUES_ERRORS:
                return {
                    ...state,
                    loading: false,
                        error: action.error
                }
                case CONSTANTS.GET_REVENUE_SUCCESS:
                    return {
                        ...state,
                        revenue: action.payload,
                            loading: false
                    }
                    default:
                        return state;
    }
}
export default revenueReducer;