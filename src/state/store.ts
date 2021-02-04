import reducers from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";

export const store = createStore(reducers, {}, applyMiddleware(thunk));

// for ts, state should be returned in immer
// const state = store.getState();
// state.cells.data;