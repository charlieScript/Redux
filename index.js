const redux = require('redux');

// middleware
const reduxLogger = require('redux-logger')
const logger = reduxLogger.logger()
const applyMiddleWare = redux.applyMiddleware()

// Action - object
function buyCake() {
  return {
    type: 'BUY_CAKE',
    info: 'First redux action',
  };
}

function buyIcecreams() {
  return {
    type: 'BUY_ICECREAMS',
    info: 'First redux action', 
  };
}

// state
// const initialState = {
//   numOfCakes: 10,
//   numOfIceCreams: 20
// };

const initialCakeState = {
  numOfCakes: 10
}

const initialIceState = {
  numOfIceCreams: 20
}

// reducer
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'BUY_CAKE':
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes - 1,
//       };
//     case 'BUY_ICECREAMS':
//       return {
//         ...state,
//         numOfIceCreams: state.numOfIceCreams - 1,
//       };
//     default:
//       return state;
//   }
// };


// MULTIPLE REDUCERS
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case 'BUY_CAKE':
      return {
        ...state,
        numOfCakes: state.numOfCakes - 1,
      };
    default:
      return state;
  }
};

const iceCreamReducer = (state = initialIceState, action) => {
  switch (action.type) {
    case 'BUY_ICECREAMS':
      return {
        ...state,
        numOfIceCreams: state.numOfIceCreams - 1,
      };
    default:
      return state;
  }
};

// combine reducers
const rootReducer = redux.combineReducers({
  cake: cakeReducer,
  icecream: iceCreamReducer
})

// store
const store = redux.createStore(rootReducer, applyMiddleWare(logger));
console.log('Initial State ', store.getState());
const unsubscribe = store.subscribe(() => {});
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyCake());
store.dispatch(buyIcecreams());
store.dispatch(buyIcecreams());
unsubscribe();
