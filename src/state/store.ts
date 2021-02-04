import reducers from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {ActionType} from "./action-types";

export const store = createStore(reducers, {}, applyMiddleware(thunk));


// Manual testing for state:
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'code'
  }
});
store.dispatch({
  type: ActionType.INSERT_CELL_BEFORE,
  payload: {
    id: null,
    type: 'text'
  }
});
// modify this id to test the state
const id = store.getState().cells.order[0];
console.log(store.getState());