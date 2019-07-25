import axios from 'axios';

export const constants = {
  ADD_BOOK: 'ADD_BOOK',
  GET_ERRORS: 'GET_ERRORS',
  CLEAR_ERRORS: 'CLEAR_ERRORS',
  GET_BOOKS: 'GET_BOOKS',
  GET_BOOK: 'GET_BOOK',
  BOOK_LOADING: 'BOOK_LOADING',
  DELETE_BOOK: 'DELETE_BOOK',
  UPDATE_BOOK: 'UPDATE_BOOK'
}

export const setBookLoading = () =>  ({ type: constants.BOOK_LOADING});
export const clearErrors = () =>  ({type: constants.CLEAR_ERRORS});

export const addBook = (bookData, history) => dispatch => {
  dispatch(clearErrors());
  axios
    .post('/articles/add', bookData)
    .then(res => {
      dispatch({type: constants.ADD_BOOK, payload: res.data})
      history.push('/')
    }) 
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: null})
    );
};

export const getBooks = () => dispatch => {
  dispatch(setBookLoading());
  axios
    .get('/articles')
    .then(res =>
      dispatch({type: constants.GET_BOOKS, payload: res.data})
    )
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: null})
    );
};

export const getBook = id => dispatch => {
  dispatch(setBookLoading());
  axios
    .get(`/articles/${id}`)
    .then(res =>
      dispatch({type: constants.GET_BOOK, payload: res.data})
    )
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: null})
    );
};

export const deleteBook = (id, history) => dispatch => {
  axios
    .delete(`/articles/delete/${id}`)
    .then(res => {
      dispatch({type: constants.DELETE_BOOK, payload: id})
      history.push('/')
    })
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: null})
    );
};

export const updateBook = (data, history) => dispatch => {
  axios
    .post(`/articles/edit`,data)
    .then(res => {
      dispatch({type: constants.UPDATE_BOOK, payload: res.data})
      history.push('/')
    })
    .catch(err =>
      dispatch({type: constants.GET_ERRORS, payload: null})
    );
};