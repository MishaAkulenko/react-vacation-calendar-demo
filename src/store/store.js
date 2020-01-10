import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import {reducers} from "../redusers/redusers";

export default createStore(reducers, applyMiddleware(thunk));
