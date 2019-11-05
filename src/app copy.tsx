/**
 * react root component
 */
import * as React from "react";
import { Provider } from "react-redux";
import createStore from "./store";
import App from "./containers";
import { hot } from "react-hot-loader/root";
import Request from "@utils/request";
import API from "@utils/api";
import ErrorBoundary from "@components/ErrorBoundary";
import { UserContext } from "@contexts/UserContext";
import { DictContext } from "@context/DictContext";
import "./styles";

const store = createStore();

class Index extends React.Component {
  state = {
    dict: []
  };

  async componentDidMount() {
    // load dict
    let response = await Request({
      url: API.common.dict
    });
    response.status && this.setState({ dict: response.result });
  }

  render() {
    return (
      <ErrorBoundary>
        <Provider store={store}>
          <DictContext.Provider value={{ ...this.state.dict }}>
            <UserContext.Provider value={{ name: "" }}>
              <App />
            </UserContext.Provider>
          </DictContext.Provider>
        </Provider>
      </ErrorBoundary>
    );
  }
}

export default hot(Index);
