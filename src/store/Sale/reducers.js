import {
    CONSTANTS
} from './actions'

const initialState = {
    sales: [],
    sale: {},
    loading: false,
    error: {}
};

const saleReducer = (state = initialState, action) => {
    switch (action.type) {
        case CONSTANTS.SALE_LOADING:
            return {
                ...state,
                loading: true
            };
        case CONSTANTS.ADD_SALE:
            return {
                ...state,
                loading: false,
                    sales: [...state.sales, action.payload]
            };
        case CONSTANTS.GET_SALES:
            return {
                ...state,
                sales: action.payload,
                    loading: false
            };
        case CONSTANTS.GET_SALE:
            return {
                ...state,
                sale: action.payload,
                    loading: false
            }
            case CONSTANTS.UPDATE_SALE:
                return {
                    ...state,
                    updateSale: action.payload.success,
                        loading: false
                };
            case CONSTANTS.DELETE_SALE:
                return {
                    ...state,
                    sale: state.sales.filter(singlesale => singlesale._id !== action.payload)
                }
                case CONSTANTS.GET_ERRORS:
                    return {
                        ...state,
                        loading: false,
                            error: action.error
                    };
                default:
                    return state;
    }
}

export default saleReducer;