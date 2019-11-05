/**
 * Reducer
 */
import { combineReducers } from "redux";

// import demoReducer from "./demoReducer";
import demoReducer from "../containers/Home/reducer";
import loginReducer from "../containers/Login/reducer";

const rootReducer = combineReducers({
  demoReducer,
  loginReducer
});

export default rootReducer;
