import { legacy_createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { reducer as UserReducer } from "../Redux/User/reducer";
import { reducer as BlogReducer } from "../Redux/Blog/reducer";
const rootReducer = combineReducers({ UserReducer, BlogReducer });

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk));
