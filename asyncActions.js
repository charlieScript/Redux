const redux = require('redux')
const applyMiddleWare = redux.applyMiddleware
const thunkMiddleWare = require('redux-thunk').default
const axios = require('axios')

const initialState = {
  loading: false,
  users: [],
  errors: ''
}

// action creators
const FETCH_USERS_REQUEST = 'FETCH_USERS_REQUEST'
const FETCH_USERS_SUCCESS = 'FETCH_USERS_SUCCESS'
const FETCH_USERS_FAILURE = 'FETCH_USERS_FAILURE'

const fetchUsersRequest = () => {
  return {
    type: FETCH_USERS_REQUEST
  }
}

const fetchUsersSuccess = () => {
  return {
    type: fetchUsersSuccess, 
    payload: users
  };
};

const fetchUsersFailure = () => {
  return {
    type: FETCH_USERS_FAILURE,
    payload: error
  };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USERS_REQUEST:
      return {
        ...state,
        loading: true
      }
    case FETCH_USERS_SUCCESS:
      return {
        loading: false,
        users: action.payload,
        error: ''
      }
    case FETCH_USERS_FAILURE:
      return {
        loading: false,
        users: [],
        error: action.payload
      }
  }
}

// Redux thunk //
const fetchUsers = () => {
 return function(dispatch) {
   dispatch(fetchUsersRequest())
  axios.get('https://jsonplaceholder.typicode.com/users')
    .then(res => {
      const users = res.data.map(user => user.id)
      dispatch(fetchUsersSuccess(users))
    })
    .catch(err => {
      dispatch(fetchUsersFailure(err.message))
    })
 }   
}

const store = redux.createStore(reducer, applyMiddleWare(thunkMiddleWare))
store.subscribe(() => console.log(store.getState()))
store.dispatch(fetchUsers())
