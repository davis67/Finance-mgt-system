import { createStore } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
import rootReducer from './rootReducer';

const initialState = {};
// const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState
);

export default store;