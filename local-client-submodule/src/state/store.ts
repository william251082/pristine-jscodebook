import reducers from "./reducers";
import {applyMiddleware, createStore} from "redux";
import thunk from "redux-thunk";
import {persistMiddleware} from "./middlewares/persist-middleware";

export const store = createStore(reducers, {}, applyMiddleware(persistMiddleware, thunk));