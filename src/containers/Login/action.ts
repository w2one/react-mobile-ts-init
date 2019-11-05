/**
 * login action
 */

import Request from "@utils/request";
import API from "@utils/api";
import { Session } from "@utils/storage";
export const LOGIN = "Login";
export const LOGOUT = "Logout";
// import { Toast } from "antd-mobile";

export const loginAction = (data, callback) => async dispatch => {
  let response = await Request({
    url: API.common.login,
    method: "post",
    data,
    headers: { token: data.result }
  });

  if (response.status) {
    // alert(JSON.response(response));
    dispatch({ type: LOGIN, data: { token: response.result } });
    Session.set("token", response.result);
    Session.set("user", JSON.stringify(data));
    callback();
  } else {
    // Toast.fail(response.msg,1);
  }
};

export const logoutAction = () => async dispatch => {
  dispatch({
    type: LOGOUT,
    data: {
      token: null
    }
  });
  Session.clear();
};
