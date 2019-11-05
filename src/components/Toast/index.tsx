/**
 * toast
 */
import { Toast } from "antd-mobile";
// import React from "react";
// import { Icon } from "antd-mobile";

// export default (message, type, duration = 1) => {
//   switch (type) {
//     case "fail":
//       Toast.fail(message, duration);
//       break;
//     case "sucess":
//       Toast.success(message, duration);
//       break;
//     default:
//       Toast.info(message, duration);
//       break;
//   }
// };

const fail = (message, duration = 1) => Toast.fail(message, duration);
// const fail = (message, duration = 0) => Toast.info(Content(message), duration);
const success = (message, duration = 1) => Toast.success(message, duration);
const info = (message, duration = 1) => Toast.info(message, duration);
const loading = (message, duration = 0) => Toast.loading(message, duration);
const hide = () => Toast.hide();

// function Content(msg) {
//   return (
//     <div style={{}}>
//       <Icon type={"cross-circle"} />
//       {msg}
//     </div>
//   );
// }

export default {
  fail,
  success,
  info,
  loading,
  hide
};
