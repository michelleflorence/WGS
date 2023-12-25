const redux = require('redux');

// 1. Create a basic Reducer
const rootReducer = (state = 0, action) => {
    switch(action.type) {
        case "INCREMENT":
            return state + 1;
        case "DECREMENT":
            return state - 1;
        default:
            return state
    }
};

// 2. Create a store
const store = redux.createStore(rootReducer);
console.log("Initial State: ", store.getState())

// 3. Dispatch action
// State nya = increment
store.dispatch({ type: "INCREMENT" });
console.log("State after increment: ", store.getState())