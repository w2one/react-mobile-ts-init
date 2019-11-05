/* eslint-disable react/jsx-handler-names */
import * as React from "react";
import { withRouter } from "react-router-dom";
import Style from "./style";

const Nav = (props: any) => (
  <div className={Style.nav}>
    {props.back && (
      <div className={Style.left} onClick={props.history.goBack}>
        <i className="arrow-left"></i>
      </div>
    )}
    <div className={Style.title}>{props.title}</div>
  </div>
);

export default withRouter(Nav);
