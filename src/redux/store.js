import { applyMiddleware, createStore, combineReducers } from "redux";
import thunk from "redux-thunk";
import { asyncReducer } from "./asyncReducer";
import { selectDataReducer } from "./selectDataReducer";
import { dataReducer } from "./dataReducer";

const middleware = applyMiddleware(thunk);

const reducer = combineReducers({
  async: asyncReducer,
  selectData: selectDataReducer,
  dataGroup: dataReducer,
});

const store = createStore(reducer, middleware);

export default store;
