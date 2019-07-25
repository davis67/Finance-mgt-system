import { constants } from './actions'

const initialState = {
  users: [],
  user: {},
  loading: false
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.USER_LOADING:
      return {
        ...state,
        loading: true
      };
    case constants.GET_USERS:
      return {
        ...state,
        users: action.payload,
        loading: false
      };
    case constants.GET_USER:
      return {
        ...state,
        user: action.payload,
        loading: false
      };
    case constants.ADD_USER:
      return {
        ...state,
        users: [ ...state.posts, action.payload]
      };
    case constants.DELETE_USER:
      return {
        ...state,
        users: state.users.filter(item => item._id !== action.payload)
      };
    case constants.UPDATE_USER:
        return {
            ...state,
            updateBook:action.payload.success
        }
    default:
      return state;
  }
}

export default usersReducer;