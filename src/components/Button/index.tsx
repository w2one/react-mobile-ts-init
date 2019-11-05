/* eslint-disable react/react-in-jsx-scope */
/**
 * button
 * children
 * style
 * onClick
 * disabled
 */

import React from "react";
import Style from "./style";

function Button(props) {
  let { onClick, children, style, disabled } = props;
  // 如果是两个文字，中间加空格
  if (typeof children === "string" && children.length === 2) {
    children = children.split("").join(" ");
  }
  return (
    <button onClick={onClick} className={Style.button} style={style} disabled={disabled}>
      {children}
    </button>
  );
}

export default Button;
