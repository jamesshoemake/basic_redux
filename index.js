// import redux from 'redux' react syntax
const redux = require("redux");
// vscode will show an error/warning when using createStore,
// this warning can be ignored for learning purposes
const createStore = redux.createStore;
const bindActionCreators = redux.bindActionCreators; // older method
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;

const reduxLogger = require("redux-logger");
const logger = reduxLogger.createLogger();

// string constants
const CAKE_ORDERED = "cake_ordered";
const CAKE_RESTOCK = "cake_restock";
const ICECREAM_ORDERED = "icecream_ordered";
const ICECREAM_RESTOCK = "icecream_restock";

//  defined action creators
function orderCake() {
  // action returned
  return {
    type: CAKE_ORDERED,
    payload: 1,
  };
}

function restockCake(quantity) {
  return {
    type: CAKE_RESTOCK,
    payload: quantity,
  };
}

function orderIcecream() {
  // action returned
  return {
    type: ICECREAM_ORDERED,
    payload: 1,
  };
}

function restockIcecream(quantity) {
  return {
    type: ICECREAM_RESTOCK,
    payload: quantity,
  };
}

// states

// const initialState = {
//   numOfCakes: 10,
//   numofIcecream: 20,
// };

const initialCakeState = {
  numOfCakes: 10,
};

const initialIcecreamState = {
  numOfIcecream: 20,
};

// reducer
// (previousState,action ) => newState
const cakeReducer = (state = initialCakeState, action) => {
  switch (action.type) {
    case CAKE_ORDERED:
      return {
        ...state, // copy of state
        numOfCakes: state.numOfCakes - 1, // override only watch changes
      };
    case CAKE_RESTOCK:
      return {
        ...state,
        numOfCakes: state.numOfCakes + action.payload,
      };
    default:
      return state;
  }
};

const icecreamReducer = (state = initialIcecreamState, action) => {
  switch (action.type) {
    case ICECREAM_ORDERED:
      return {
        ...state, // copy of state
        numOfIcecream: state.numOfIcecream - 1, // override only watch changes
      };
    case ICECREAM_RESTOCK:
      return {
        ...state,
        numOfIcecream: state.numOfIcecream + action.payload,
      };
    default:
      return state;
  }
};

// single reduce with both cake and icecream
// const reducer = (state = initialState, action) => {
//   switch (action.type) {
//     case CAKE_ORDERED:
//       return {
//         ...state, // copy of state
//         numOfCakes: state.numOfCakes - 1, // override only watch changes
//       };
//     case CAKE_RESTOCK:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     case ICECREAM_ORDERED:
//       return {
//         ...state, // copy of state
//         numOfCakes: state.numOfCakes - 1, // override only watch changes
//       };
//     case ICECREAM_RESTOCK:
//       return {
//         ...state,
//         numOfCakes: state.numOfCakes + action.payload,
//       };
//     default:
//       return state;
//   }
// };

// const store = createStore(reducer);
const rootReducer = combineReducers({
  cake: cakeReducer,
  icecream: icecreamReducer,
});

const store = createStore(rootReducer, applyMiddleware(logger));
console.log("Init state", store.getState());

const unsubscribe = store.subscribe(() => {});

// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(orderCake());
// store.dispatch(restockCake(3));

const actions = bindActionCreators(
  { orderCake, restockCake, orderIcecream, restockIcecream },
  store.dispatch
);

actions.orderCake();
actions.orderCake();
actions.orderCake();
actions.restockCake(3);
actions.orderIcecream();
actions.orderIcecream();
actions.orderIcecream();
actions.restockIcecream(3);

unsubscribe();
