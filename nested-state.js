const redux = require("redux");
const produce = require("immer").produce;

const initState = {
  name: "John",
  address: {
    street: "123 Main St",
    city: "Boston",
    state: "MA",
  },
};

const STREET_UPDATED = "street_updated";
const updateStreet = (street) => {
  return {
    type: STREET_UPDATED,
    payload: street,
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case STREET_UPDATED:
      // return {
      //   ...state,
      //   address: {
      //     ...state.address,
      //     street: action.payload,
      //   },
      // };
      return produce(state, (draft) => {
        draft.address.street = action.payload;
      });
    default: {
      return state;
    }
  }
};

const store = redux.createStore(reducer);
console.log("Init state", store.getState());
const unsubscribe = store.subscribe(() => {
  console.log("Updated state", store.getState());
});
store.dispatch(updateStreet("456 Main St"));
unsubscribe();
