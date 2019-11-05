/**
 * store
 */
import reducers from "../reducers";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Session } from "@utils/storage";

function store(initialState: any) {
  // from session storage get token then set in redux
  const token = Session.get("token");
  if (token) {
    initialState = Object.assign({}, initialState, {
      loginReducer: { token }
    });
  }

  let createStoreWithMiddleware;
  // judge env logger
  if (process.env.NODE_ENV === "production") {
    createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
  } else {
    const { createLogger } = require("redux-logger");
    createStoreWithMiddleware = applyMiddleware(thunk, createLogger())(createStore);
  }
  const store = createStoreWithMiddleware(reducers, initialState);
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept("../reducers", () => {
      const nextRootReducer = require("../reducers/index");
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
}

export default store;
