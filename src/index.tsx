/* eslint-disable no-unused-vars */
/**
 * entry
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./app";
import "@utils/rem";

// analytics
// import { analytics, timing } from "./utils/analytics";

// import FastClick from "fastclick";

// FastClick.attach(document.body);

if (process.env.NODE_ENV !== "production") {
  const eruda = require("eruda").default;
  const el = document.createElement("div");
  document.body.appendChild(el);
  eruda.init({
    container: el,
    // tool: ["console", "elements"],
    useShadowDom: true,
    autoScale: true
  });
}

ReactDOM.render(<App />, document.getElementById("root"));
