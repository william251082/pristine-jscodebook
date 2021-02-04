import reducers from "./state/reducers";
import {applyMiddleware, createStore} from "redux";

export const store = createStore(reducers, {}, applyMiddleware());